<template>
    <div class="pokemon-wrapper" :style="playerPosition" :class="wrapperClass">
      <div class="size-wrapper" :style="{'width': dataPokemon.size + '%'}" @mouseover="onHover()" @mouseleave="onHover(false)">
        <div class="bottom-wrapper">
          <div class="damage-fx-wrapper"></div>
          <img class="pokemon-sprite" :src="spritePath">
        </div>
        
        <div class="healthBar-infos-wrapper">
          <HealthBar
            :maxHealth="maxHealth"
            :currentHealth="currentHealth"
            :block="block"
            :attack="$store.getters.getActivePlayerPokemon.stats.attack"
            :defense="$store.getters.getActivePlayerPokemon.stats.defense"
            :stacks="$store.getters.getActivePlayerPokemon.stacks"
          ></HealthBar>
        </div>
        <Helper :id="id"></Helper>
      </div>
  </div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import Pokemon from "./Pokemon";
import Helper from "./Helper.vue"
import HealthBar from "./HealthBar.vue"
import backgroundSlots from "@/constantData/backgroundSlots"
import { inject } from 'vue'

@Options({
  name: "PlayerPokemon",
  components: {
    Helper,
    HealthBar
  },
})

export default class PlayerPokemon extends Pokemon {

  private emitter: any = inject('emitter')

  get playerPosition(): string {
    const currentBackground: string = this.$store.getters.getBackgroundUsed
    return `left: ${backgroundSlots[currentBackground]['player']['left']}%; bottom: ${backgroundSlots[currentBackground]['player']['bottom']}%;`
  }

  public onHover(enter: boolean = true): void {
    if(enter) {
      this.mouseOver = true
    } 
    else {
      this.mouseOver = false
    } 
  }

  protected faint(): void {
    this.$store.commit("faintActivePokemon")
    this.emitter.emit("fainted", "player")
  }

  private applyBuff(payload) {
    if(payload.buffAttack) {
        this.$store.commit("buffPokemonAttack", {index: this.$store.getters.getActiveIndex, target: "player", buff: payload.buffAttack})
      }
    if(payload.buffDefense) {
      this.$store.commit("buffPokemonDefense", {index: this.$store.getters.getActiveIndex, target: "player", buff: payload.buffAttack})
    }
  }

  private onNewTurn() {
    this.setBlock(0)
  }

  private onDamage(payload) {
    if(payload.user === "player" && payload.playAttackAnim) {
      this.playAttackAnim()
    }
    if(payload.target === "player") {
      const damageDealt = this.takeDamage(payload.value, payload.type, payload.ignoreBlock)
      if(payload.leechlife) {
        const leechValue = Math.floor((damageDealt * (payload.leechlife / 100)))
        this.emitter.emit("heal", {user : payload.user, value: leechValue})
      }
      this.$store.commit("changeActivePokemonHealth", this.currentHealth)
    }
  }

  private onBlock(payload) {
    if(payload.user === "player") {
      this.gainBlock(payload.value)
    }
  }

  private onSelfDamage(payload) {
    if(payload.user === "player") {
      this.takeDamage(payload.value, null, true)
    }
  }

  private onSelfBuff(payload) {
    if(payload.user === "player") {
      this.applyBuff(payload)
    }
  }

  private onTargetBuff(payload) {
    if(payload.target === "player") {
      this.applyBuff(payload)
    }
  }

  private onHeal(payload) {
    if(payload.user === "player") {
      if(!payload.percentage) {
        this.heal(payload.value)
      }
      else {
        const totalValue = Math.floor((this.maxHealth * (payload.value / 100)))
        this.heal(totalValue)
      }
      this.$store.commit("changeActivePokemonHealth", this.currentHealth)
    }
  }

  private onEnergy(payload) {
    this.$store.commit("getEnergy", payload.value)
  }

  public mounted() {

    this.maxHealth = this.dataPokemon.baseStats.hp
    this.currentHealth = this.$store.getters.getActivePlayerPokemon.stats.hp

    this.emitter.on("startNewTurn", this.onNewTurn)
    this.emitter.on("damage", this.onDamage)
    this.emitter.on('block', this.onBlock)
    this.emitter.on('selfdamage', this.onSelfDamage)
    this.emitter.on('selfbuff', this.onSelfBuff)
    this.emitter.on('targetbuff', this.onTargetBuff)
    this.emitter.on("heal", this.onHeal)
    this.emitter.on("energy", this.onEnergy)
  }

  public beforeUnmount() {
    this.emitter.off("startNewTurn", this.onNewTurn)
    this.emitter.off("damage", this.onDamage)
    this.emitter.off("block", this.onBlock)
    this.emitter.off('selfdamage', this.onSelfDamage)
    this.emitter.off('selfbuff', this.onSelfBuff)
    this.emitter.off('targetbuff', this.onTargetBuff)
    this.emitter.off("heal", this.onHeal)
    this.emitter.off("energy", this.onEnergy)
  }
}

</script>

<style lang="scss" scoped>
@import './style/pokemon.scss';
@import './style/playerPokemon.scss';
@import '../animations/pokemon/pokemon.scss';
@import '../animations/pokemon/playerPokemon.scss';
</style>
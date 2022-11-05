<template>
    <div class="pokemon-wrapper" :style="playerPosition" :class="wrapperClass">
      <div class="size-wrapper" :style="{'width': dataPokemon.size + '%'}" @mouseover="onHover()" @mouseleave="onHover(false)">
        <img class="pokemon-sprite" :src="spritePath">
        <div class="healthBar-infos-wrapper">
          <HealthBar
            :maxHealth="maxHealth"
            :currentHealth="currentHealth"
            :block="block"
            :attack="$store.state.battle.playerStats.attack"
            :defense="$store.state.battle.playerStats.defense"
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
    return `left: ${this.$store.state.backgrounds.slots[currentBackground]['player']['left']}%; bottom: ${this.$store.state.backgrounds.slots[currentBackground]['player']['bottom']}%;`
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
    this.emitter.emit("setPlayerFainted")
  }

  private applyBuff(payload) {
    if(payload.buffAttack) {
        this.$store.commit("buffPlayerAttack", payload.buffAttack)
      }
    if(payload.buffDefense) {
      this.$store.commit("buffPlayerDefense", payload.buffDefense)
    }
  }

  private onNewTurn() {
    this.setBlock(0)
  }

  private onDamage(payload) {
    if(payload.target !== "player" && payload.target !== null) {
      this.playAttackAnim()
    }
    else {
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
    this.$store.commit("getEnergy", payload.energy)
  }

  public mounted() {

    this.maxHealth = this.dataPokemon.baseStats.hp
    this.attack = this.dataPokemon.baseStats.attack
    this.defense = this.dataPokemon.baseStats.defense
    this.currentHealth = this.$store.state.playerTeam.team[this.$store.getters.getActiveIndex].remainingHp

    this.$store.commit("setPlayerAttack", this.attack)
    this.$store.commit("setPlayerDefense", this.defense)

    this.emitter.on("startNewTurn", this.onNewTurn)
    this.emitter.on("damage", this.onDamage)
    this.emitter.on('block', this.onBlock)
    this.emitter.on('selfbuff', this.onSelfBuff)
    this.emitter.on('targetbuff', this.onTargetBuff)
    this.emitter.on("heal", this.onHeal)
    this.emitter.on("energy", this.onEnergy)
  }

  public beforeUnmount() {
    this.emitter.off("startNewTurn", this.onNewTurn)
    this.emitter.off("damage", this.onDamage)
    this.emitter.off("block", this.onBlock)
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
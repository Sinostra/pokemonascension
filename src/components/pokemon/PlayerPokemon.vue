<template>
    <div class="pokemon-wrapper" :style="playerPosition" :class="wrapperClass">
      <div class="size-wrapper" :style="{'width': dataPokemon.size + '%'}" @mouseover="onHover()" @mouseleave="onHover(false)">
        <img class="pokemon-sprite" :src="spritePath">
        <div class="healthBar-infos-wrapper">
          <div class="healthBar">
            <div class="currentHealth" :class="healthBarClass" :style="{'width': getHealthBarPercent() + '%'}"></div>
            <div class="bottom-infos">
              <div class="healthAmount" :style="getFontSize()">{{currentHealth}}/{{maxHealth}}</div>
            </div>
            <div v-if="block" class="block-wrapper">
              <div class="blockAmount">{{block}}</div>
            </div>
          </div>
        </div>
        <div class="help-tooltip">
          <div class="pokemon-data">
            <div class="text">{{dataPokemon['name']['english']}}</div>
            <div class="type" v-for="(type, index) in dataPokemon.type" :key="index">
              <img :src="getTpyeIcon(type)" class="type-img">
            </div>
          </div>
          <div class="pokemon-data">
            <div class="text">Weaknesses :</div>
            <div class="type" v-for="(type, index) in weaknesses" :key="index">
              <img :src="getTpyeIcon(type)" class="type-img">
            </div>
          </div>
          <div class="pokemon-data">
            <div class="text">Resistances :</div>
            <div class="type" v-for="(type, index) in resistances" :key="index">
              <img :src="getTpyeIcon(type)" class="type-img">
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import Pokemon from "./Pokemon";
import { inject } from 'vue'

@Options({
  name: "PlayerPokemon",
})

export default class PlayerPokemon extends Pokemon {

  private emitter: any = inject('emitter')

  get playerPosition(): string {
    const currentBackground: string = this.$store.state.battle.backgroundUsed
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
    console.log("Player fainted")
    this.emitter.emit("setPlayerFainted")
  }

  private onNewTurn() {
    this.setBlock(0)
  }

  private onDamage(payload) {
    if(payload.target !== "player" && payload.target !== null) {
      this.playAttackAnim()
    }
    else {
      this.takeDamage(payload.damage, payload.type, payload.ignoreBlock)
      this.$store.commit("changeActivePokemonHealth", this.currentHealth)
    }
  }

  private onDamageAllFoes() {
    this.playAttackAnim()
  }

  private onHeal(payload) {
    if(payload.user === "player") {
      this.heal(payload.amount)
      this.$store.commit("changeActivePokemonHealth", this.currentHealth)
    }
  }

  private onGainBlock(payload) {
    if(payload.user === "player") {
      this.gainBlock(payload.amount)
    }
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
    this.emitter.on("damageAllFoes", this.onDamageAllFoes)
    this.emitter.on("heal", this.onHeal)
    this.emitter.on("gainBlock", this.onGainBlock)
  }

  public beforeUnmount() {
    this.emitter.off("startNewTurn", this.onNewTurn)
    this.emitter.off("damage", this.onDamage)
    this.emitter.off("damageAllFoes", this.onDamageAllFoes)
    this.emitter.off("heal", this.onHeal)
    this.emitter.off("gainBlock", this.onGainBlock)
  }
}

</script>

<style lang="scss" scoped>
@import './style/pokemon.scss';
@import './style/playerPokemon.scss';
@import '../animations/pokemon/pokemon.scss';
@import '../animations/pokemon/playerPokemon.scss';
</style>
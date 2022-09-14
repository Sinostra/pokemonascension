<template>
    <div class="pokemon-wrapper" :style="playerPosition" :class="wrapperClass">
      <div class="size-wrapper" :style="{'width': dataPokemon.size + '%'}" @mouseover="onHover()" @mouseleave="onHover(false)">
        <img class="pokemon-sprite" :src="spritePath">
        <div class="healthBar-infos-wrapper">
          <div class="healthBar">
            <div class="currentHealth" :class="healthBarClass" :style="{'width': getHealthBarPercent() + '%'}"></div>
            <div class="bottom-infos">
              <div class="healthAmount" :style="getFontSize()">{{currentHealth}} / {{maxHealth}}</div>
            </div>
          </div>
          <!-- <div class="block-wrapper">
            {{block}}
          </div> -->
          <!-- <div class="types-wrapper">
            <div class="type" v-for="(type, index) in dataPokemon.type" :key="index">
              <img :src="getTpyeIcon(dataPokemon.type[index])" class="type-img">
            </div>
          </div> -->
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

@Options({
  name: "PlayerPokemon",
})

export default class PlayerPokemon extends Pokemon {
  get playerPosition(): string {
    const currentBackground: string = this.$store.state.battle.backgroundUsed
    return `left: ${this.$store.state.backgrounds.slots[currentBackground]['player']['left']}%; bottom: ${this.$store.state.backgrounds.slots[currentBackground]['player']['bottom']}%;`
  }

  public onHover(enter: boolean = true): void {
    if(enter) this.mouseOver = true
    else this.mouseOver = false
  }

  public mounted() {

    this.$store.dispatch("setPlayerAttack", this.attack)
    this.$store.dispatch("setPlayerDefense", this.defense)

    this.$store.subscribeAction((action) => {
      if(action.type === "startNewTurn") {
        this.setBlock(0)
      }

      if(action.type === "damageAllFoes") {
        this.playAttackAnim()
      }

      if(action.type === "damage") {
        if(action.payload.target !== "player" && action.payload.target !== null) {
          this.playAttackAnim()
        }
        else {
          this.takeDamage(action.payload.damage, action.payload.type, action.payload.ignoreBlock)
        }
      }

      if(action.type === "heal" && action.payload.user === "player") {
        this.heal(action.payload.amount)
      }

      if(action.type === "gainBlock" && action.payload.user === "player") {
        this.gainBlock(action.payload.amount)
      }
    })
  }
}

</script>

<style lang="scss" scoped>
@import './style/pokemon.scss';
@import './style/playerPokemon.scss';
@import '../animations/pokemon/pokemon.scss';
@import '../animations/pokemon/playerPokemon.scss';
</style>
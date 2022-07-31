<template>
    <div class="pokemon-wrapper" :style="playerPosition" :class="animClass">
      <div class="size-wrapper" :style="{'width': $store.state.pokedex.constantDex[id]['size'] + '%'}">
        <img :src="spritePath">
        <div class="healthBar-infos-wrapper">
          <div class="healthBar">
            <div class="currentHealth" :class="healthBarClass" :style="{'width': getHealthBarPercent() + '%'}"></div>
            <div class="healthAmount" :style="getFontSize()">{{currentHealth}} / {{maxHealth}} </div>
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


  public mounted() {
    this.$store.subscribeAction((action) => {
      if(action.type === "damageFoe" || action.type === "damageAllFoes") {
        this.playAttackAnim()
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
<template>
    <div class="pokemon-wrapper" :style="foePosition">
      <div class="size-wrapper" :style="{'width': $store.state.pokedex.constantDex[id]['size'] + '%'}">
        <div class="healthBar-infos-wrapper">
          <div class="healthBar">
            <div class="currentHealth" :class="healthBarClass" :style="{'width': getHealthBarPercent() + '%'}"></div>
            <div class="healthAmount" :style="getFontSize()">{{currentHealth}} / {{maxHealth}} </div>
          </div>
        </div>
        <img :src="spritePath" :class="animClass">
      </div>
  </div>
</template>

<script lang="ts">
import Pokemon from "./Pokemon";

export default class FoePokemon extends Pokemon {
  get foePosition(): string {
    const currentBackground: string = this.$store.state.battle.backgroundUsed
    return `left: ${this.$store.state.backgrounds.slots[currentBackground]['foes'][0]['left']}%; bottom: ${this.$store.state.backgrounds.slots[currentBackground]['foes'][0]['bottom']}%;`
  }
}

</script>

<style lang="scss" scoped>
@import './style/pokemon.scss';
@import './style/foePokemon.scss';
</style>
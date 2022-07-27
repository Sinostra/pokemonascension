<template>
    <div class="pokemon-wrapper" :style="foePosition">
      <div class="size-wrapper" :style="{'width': $store.state.pokedex.constantDex[id]['size'] + '%'}">
        <div class="bottom-wrapper">
          <div class="healthBar-infos-wrapper">
            <div class="healthBar">
              <div class="currentHealth" :class="healthBarClass" :style="{'width': getHealthBarPercent() + '%'}"></div>
              <div class="healthAmount" :style="getFontSize()">{{currentHealth}} / {{maxHealth}} </div>
            </div>
          </div>
          <img :src="spritePath" :class="animClass">
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import Pokemon from "./Pokemon";

@Options({
  props: {
    index: Number,
  }
})

export default class FoePokemon extends Pokemon {
  private index!: number;

  get foePosition(): string {
    const currentBackground: string = this.$store.state.battle.backgroundUsed
    return `left: ${this.$store.state.backgrounds.slots[currentBackground]['foes'][this.index]['left']}%; bottom: ${this.$store.state.backgrounds.slots[currentBackground]['foes'][this.index]['bottom']}%;`
  }
}

</script>

<style lang="scss" scoped>
@import './style/pokemon.scss';
@import './style/foePokemon.scss';
</style>
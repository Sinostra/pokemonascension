<template>
    <div class="pokemon-wrapper" :style="foePosition" :class="animClass">
      <div class="size-wrapper" :style="{'width': $store.state.pokedex.constantDex[id]['size'] + '%'}">
        <div class="bottom-wrapper" @click.stop="onClick()">
          <div class="healthBar-infos-wrapper">
            <div class="healthBar">
              <div class="currentHealth" :class="healthBarClass" :style="{'width': getHealthBarPercent() + '%'}"></div>
              <div class="healthAmount" :style="getFontSize()">{{currentHealth}} / {{maxHealth}} </div>
            </div>
          </div>
          <img :src="spritePath" :class="spriteClass">
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import Pokemon from "./Pokemon";

@Options({
  name: "FoePokemon",
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

  get spriteClass(): string {
    if(this.$store.state.board.selectedCard === null) return ''
    return this.$store.state.cards.dataCards[this.$store.state.board.selectedCard]['target'] ? 'target' : ''
  }

  private onClick(): void {
    this.$store.dispatch("clickPlayer")
    // console.log(`${this.$store.state.pokedex.constantDex[this.id].name.french} cliqué à l'index ${this.index}`)
  }
}

</script>

<style lang="scss" scoped>
@import './style/pokemon.scss';
@import './style/foePokemon.scss';
@import '../animations/pokemon/pokemon.scss';
@import '../animations/pokemon/foePokemon.scss';
</style>
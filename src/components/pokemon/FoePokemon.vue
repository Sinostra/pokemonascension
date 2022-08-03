<template>
    <div class="pokemon-wrapper" :style="foePosition" :class="animClass">
      <div class="size-wrapper" :style="{'width': dataPokemon.size + '%'}">
        <div class="bottom-wrapper" @click.stop="onClick()">
          <div class="healthBar-infos-wrapper">
            <div class="healthBar">
              <div class="currentHealth" :class="healthBarClass" :style="{'width': getHealthBarPercent() + '%'}"></div>
              <div class="healthAmount" :style="getFontSize()">{{currentHealth}} / {{maxHealth}} </div>
            </div>
            <div class="block-wrapper">
              {{block}}
            </div>
            <div class="types-wrapper">
              <div class="type" v-for="(type, index) in dataPokemon.type" :key="index">
                <img :src="getPokemonTpyeIcon(dataPokemon.type[index])" class="type-img">
              </div>
            </div>
          </div>
          <img :src="spritePath" :class="spriteClass" @mouseover="onHover()" @mouseleave="onHover(false)">
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import Pokemon from "./Pokemon";
import suffleArray from "@/engine/Shuffle";
import cloneDeep from "lodash.clonedeep"

@Options({
  name: "FoePokemon",
  props: {
    index: Number,
    maxHealth: Number,
    patternSettings: Object,
  }
})

export default class FoePokemon extends Pokemon {
  private index!: number;
  protected maxHealth: number = this.maxHealth
  private patternSettings!: any
  private pattern = []

  get foePosition(): string {
    const currentBackground: string = this.$store.state.battle.backgroundUsed
    return `left: ${this.$store.state.backgrounds.slots[currentBackground]['foes'][this.index]['left']}%; bottom: ${this.$store.state.backgrounds.slots[currentBackground]['foes'][this.index]['bottom']}%;`
  }

  get spriteClass(): string {
    if(this.$store.getters.selectedCard === null) return ''
    return this.$store.state.cards.dataCards[this.$store.getters.selectedCard]['target'] ? 'target' : ''
  }

  get nextMove() {
    let nextMove = {}
    if(this.$store.state.battle.turnCounter === 0) return nextMove

    if(this.$store.state.battle.turnCounter % this.patternSettings.pattern.length === 1) {
      this.setPattern()
    }

    let nextMoveIndex = (this.$store.state.battle.turnCounter % this.pattern.length) -1
    if(nextMoveIndex < 0) {
      nextMoveIndex = this.pattern.length -1
    }
    return this.pattern[nextMoveIndex]
  }

  private onClick(): void {
    if(this.$store.getters.selectedCard) {
      this.$store.dispatch("foePokemonHasBeenClicked", this.index)
    }
  }

  private onHover(enter: boolean = true): void {
    if(enter) this.$store.dispatch("mouseOver", this.dataPokemon['type'])
    else this.$store.dispatch("mouseOver", null)
  }

  private setPattern() {
    const pattern = cloneDeep(this.patternSettings.pattern)

    pattern.forEach((move, index) => {
      if(Array.isArray(move)) {
        pattern[index] = suffleArray(move)[0]
      }
    })

    if(this.patternSettings.patternIndexToRandomise) {
      this.pattern = suffleArray(pattern, this.patternSettings.patternIndexToRandomise)
    }
    else this.pattern = suffleArray(pattern)
  }

  public mounted() {

    this.$store.subscribeAction((action) => {
      if(action.type === "damageFoe") {
        if(action.payload.target === this.index) {
          this.takeDamage(action.payload.damage, action.payload.type, action.payload.ignoreBlock)
        } 
      }

      if(action.type === "damageAllFoes") {
        this.takeDamage(action.payload.damage, action.payload.type, action.payload.ignoreBlock)
      }
    })
  }
}

</script>

<style lang="scss" scoped>
@import './style/pokemon.scss';
@import './style/foePokemon.scss';
@import '../animations/pokemon/pokemon.scss';
@import '../animations/pokemon/foePokemon.scss';
</style>
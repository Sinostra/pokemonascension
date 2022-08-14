<template>
    <div class="pokemon-wrapper" :style="foePosition" :class="animClass">
      <div class="size-wrapper" :style="{'width': dataPokemon.size + '%'}">
        <div class="bottom-wrapper" @click.stop="onClick()">
          <div class="healthBar-infos-wrapper">
            <div v-if="nextMove && canShowIntents" class="intent" :style="getFontSize(1.2)">
              <div v-if="nextMove['damage'] > 0" class="intent-category damage">
                  <div class="text-wrapper">
                    <span :class="damageMoveClass">{{Math.ceil(nextMove['damage'] * nextMoveDamageModifier)}}</span>
                    <span v-if="nextMove['damageTimes']">x{{nextMove['damageTimes']}}</span>
                  </div>
                  <div class="img-wrapper">
                    <img :src="getTpyeIcon(nextMove['type'])">
                  </div>
                </div>
              <div v-if="nextMove['block'] > 0" class="intent-category block">
                <div class="text-wrapper">{{nextMove['block']}}</div>
                <div class="img-wrapper">
                  <img :src="shieldSprite">
                </div>
              </div>
            </div>
            <div class="healthBar">
              <div class="currentHealth" :class="healthBarClass" :style="{'width': getHealthBarPercent() + '%'}"></div>
              <div class="bottom-infos">
                <div class="healthAmount" :style="getFontSize()">{{currentHealth}} / {{maxHealth}} </div>
              </div>
            </div>
            <div class="block-wrapper">
              {{block}}
            </div>
            <div class="types-wrapper">
              <div class="type" v-for="(type, index) in dataPokemon.type" :key="index">
                <img :src="getTpyeIcon(dataPokemon.type[index])" class="type-img">
              </div>
            </div>
          </div>
          <img :src="spritePath" :class="spriteClass" @mouseover="onHover()" @mouseleave="onHover(false)" class="pokemon-sprite">
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
    attack: Number,
    defense: Number,
    patternSettings: Object,
  }
})

export default class FoePokemon extends Pokemon {
  private index!: number;
  protected maxHealth: number = this.maxHealth
  protected attack: number = this.attack
  protected defense: number = this.defense

  private patternSettings!: any
  private pattern = []
  private canShowIntents: boolean = true

  get foePosition(): string {
    const currentBackground: string = this.$store.state.battle.backgroundUsed
    return `left: ${this.$store.state.backgrounds.slots[currentBackground]['foes'][this.index]['left']}%; bottom: ${this.$store.state.backgrounds.slots[currentBackground]['foes'][this.index]['bottom']}%;`
  }

  get spriteClass(): string {
    if(this.$store.getters.selectedCard === null) return ''
    return this.$store.state.cards.dataCards[this.$store.getters.selectedCard]['target'] ? 'target' : ''
  }

  get shieldSprite() {
    return require('@/assets/img/interface/shield.png')
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

    nextMove = this.pattern[nextMoveIndex]

    if(nextMove['damage']) {
      nextMove['damage'] += this.attack
    }

    if(nextMove['block']) {
      nextMove['block'] += this.defense
    }

    return nextMove
  }

  get nextMoveDamageModifier(): number {
    const playerActivePokemonTypes = this.$store.state.pokedex.constantDex[this.$store.state.playerTeam.team[this.$store.getters.getActiveIndex]['id']]['type']
    return this.getTypeMatchup(this.nextMove['type'], playerActivePokemonTypes)
  }

  get damageMoveClass(): string {
    let moveClass = ''
    if(this.nextMoveDamageModifier > 1) moveClass = 'super-effective'
    else if(this.nextMoveDamageModifier < 1) moveClass = 'not-very-effective'
    return moveClass
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

  private playMove(time: number = 1) {
    if(this.fainted) {
      this.$store.dispatch("foeMovePlayed", this.index)
    }

    else {
      if(this.nextMove['damage']) {
        this.playAttackAnim()
      }
      const effect = time === 1 ? this.nextMove : {
        'damage': this.nextMove['damage'],
        'type' : this.nextMove['type'],
      }
      this.$store.dispatch("playFoeMove", {
        user: this.index,
        effect,
      })
      if(this.nextMove['damageTimes'] && time < this.nextMove['damageTimes']) {
        time++
        setTimeout(() => {this.playMove(time)}, 500)
      }

      else {
        this.$store.dispatch("foeMovePlayed", this.index)
        this.canShowIntents = false
      }
    }
  }

  public mounted() {

    this.$store.subscribeAction((action) => {
      if(action.type === "endPlayerTurn") {
        this.setBlock(0)
      }

      if(action.type === "startNewTurn") {
        this.canShowIntents = true
      }

      if(action.type === "damage") {
        if(action.payload.target === this.index) {
          this.takeDamage(action.payload.damage, action.payload.type, action.payload.ignoreBlock)
        } 
      }

      if(action.type === "damageAllFoes") {
        this.takeDamage(action.payload.damage, action.payload.type, action.payload.ignoreBlock)
      }

      if(action.type === "gainBlock" && action.payload.user === this.index) {
        this.gainBlock(action.payload.amount)
      }

      if(action.type === "foeTurn" && action.payload === this.index) {
        this.playMove()
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
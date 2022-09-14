<template>
    <div class="pokemon-wrapper" :style="foePosition" :class="wrapperClass">
      <div class="size-wrapper" :style="{'width': dataPokemon.size + '%'}">
        <div class="bottom-wrapper" @click.stop="onClick()">
          <div class="healthBar-infos-wrapper">
            <div v-if="nextMove && canShowIntents" class="intent" :style="getFontSize(1.2)">
              <div v-if="nextMove['damage'] > 0" class="intent-category damage">
                  <div class="text-wrapper">
                    <span v-if="nextMoveDamageModifier < 1" :class="damageMoveClass">{{ Math.floor(nextMove['damage'] * nextMoveDamageModifier)}}</span>
                    <span v-else :class="damageMoveClass">{{ Math.ceil(nextMove['damage'] * nextMoveDamageModifier)}}</span>
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
            <!-- <div class="block-wrapper">
              {{block}}
            </div> -->
            <!-- <div class="types-wrapper">
              <div class="type" v-for="(type, index) in dataPokemon.type" :key="index">
                <img :src="getTpyeIcon(dataPokemon.type[index])" class="type-img">
              </div>
            </div> -->
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
    baseAttack: Number,
    baseDefense: Number,
    pattern: Array,
    patternSettings: Object,
  }
})

export default class FoePokemon extends Pokemon {
  public index!: number;
  protected maxHealth: number = this.maxHealth

  public baseAttack!: number;
  public baseDefense!: number;

  public patternSettings!: any
  public pattern = []

  public resolvedPattern = []
  public canShowIntents: boolean = true

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

    else if(this.$store.state.battle.turnCounter === 1) this.setResolvedPattern()

  
    if(this.$store.state.battle.turnCounter % this.resolvedPattern.length === 1) {
      this.setResolvedPattern()
    }

    let nextMoveIndex = (this.$store.state.battle.turnCounter % this.resolvedPattern.length) -1
    if(nextMoveIndex < 0) {
      nextMoveIndex = this.resolvedPattern.length -1
    }

    nextMove = cloneDeep(this.resolvedPattern[nextMoveIndex])

    let nextMoveDamage = 0

    if(nextMove['block']) {
      nextMove['block'] += this.defense
    }

    if(nextMove['damage']) {

      nextMoveDamage = nextMove['damage'] + this.attack

      if(nextMoveDamage < 1) nextMoveDamage = 1

      if(!isNaN(nextMoveDamage)) nextMove['damage'] = nextMoveDamage
    } 

    return nextMove
  }

  get nextMoveDamageModifier(): number {
    const playerActivePokemonTypes = this.$store.state.pokedex.constantDex[this.$store.state.playerTeam.team[this.$store.getters.getActiveIndex]['id']]['type']
    if(this.nextMove['type']) {
      return this.getTypeMatchup(this.nextMove['type'], playerActivePokemonTypes) 
    }
    else return 1
    
  }

  get playerPokemonTypes() {
    return this.$store.state.pokedex.constantDex[this.$store.state.playerTeam.team[this.$store.getters.getActiveIndex]['id']]['type']
  }

  get damageMoveClass(): string {
    let moveClass = ''
    if(this.nextMoveDamageModifier > 1) moveClass = 'super-effective'
    else if(this.nextMoveDamageModifier < 1) moveClass = 'not-very-effective'
    return moveClass
  }

  public onClick(): void {
    if(this.$store.getters.selectedCard) {
      this.$store.dispatch("foePokemonHasBeenClicked", this.index)
    }
  }

  public onHover(enter: boolean = true): void {
    if(enter) this.$store.dispatch("mouseOver", this.dataPokemon['type'])
    else this.$store.dispatch("mouseOver", null)
  }

  public setResolvedPattern() {

    let pattern: any = cloneDeep(this.pattern)


    pattern.forEach((move, index) => {
      if(Array.isArray(move)) {
        pattern[index] = suffleArray(move)[0]
      }
    })


    if(this.patternSettings.patternIndexToRandomise) {
      this.resolvedPattern = suffleArray(pattern, this.patternSettings.patternIndexToRandomise)
    }
    else this.resolvedPattern = suffleArray(pattern)

  }

  public playMove(time: number = 1) {
    if(this.fainted) {
      this.$store.dispatch("foeMovePlayed", this.index)
    }

    else {
      this.$store.dispatch("playFoeMove", {
        user: this.index,
        effect: this.nextMove,
      })
    }
  }

  public mounted() {

    this.attack = this.baseAttack;
    this.defense = this.baseDefense;

    this.$store.subscribeAction((action) => {
      if(action.type === "endPlayerTurn") {
        this.setBlock(0)
      }

      if(action.type === "startNewTurn") {
        this.canShowIntents = true
      }

      if((action.type === "damage" && action.payload.target === this.index) || action.type === "damageAllFoes") {
        this.takeDamage(action.payload.damage, action.payload.type, action.payload.ignoreBlock)
      }

      if(action.type === "damage" && action.payload.user === this.index) {
        this.playAttackAnim()
      }

      if(action.type === "heal" && action.payload.user === this.index) {
        this.heal(action.payload.amount)
      }

      if(action.type === "gainBlock" && action.payload.user === this.index) {
        this.gainBlock(action.payload.amount)
      }

      if(action.type === "buffFoeAttack" && action.payload.user === this.index) {
        this.attack += action.payload.amount
      }

      if(action.type === "buffFoeDefense" && action.payload.user === this.index) {
        this.defense += action.payload.amount
      }

      if((action.type === "deBuffFoeAttack" && action.payload.target === this.index) || action.type === "deBuffAllFoesAttack") {
        this.attack -= action.payload.amount
      }

      if((action.type === "deBuffFoeDefense" && action.payload.target === this.index) || action.type === "deBuffAllFoesDefense") {
        this.defense -= action.payload.amount
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
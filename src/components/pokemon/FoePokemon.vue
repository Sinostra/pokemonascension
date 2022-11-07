<template>
    <div class="pokemon-wrapper" :style="foePosition" :class="wrapperClass">
      <div class="size-wrapper" :style="{'width': dataPokemon.size + '%'}">
        <div class="bottom-wrapper" @click.stop="onClick()">
          <div class="healthBar-infos-wrapper">
            <Intents v-if="canShowIntents"
              :nextMove="nextMove"
              :mouseOver="mouseOver"
              :stats="{
                attack: $store.getters.getFoeTeam[index]['stats']['attack'],
                defense: $store.getters.getFoeTeam[index]['stats']['defense'],
              }"
            ></Intents>
            <HealthBar
              :maxHealth="maxHealth"
              :currentHealth="currentHealth"
              :block="block"
              :attack="$store.getters.getFoeTeam[index]['stats']['attack']"
              :defense="$store.getters.getFoeTeam[index]['stats']['defense']"
            ></HealthBar>
            <Helper :id="id" :style="helpToolTipStyle"></Helper>
          </div>
          <img :src="spritePath" :class="spriteClass" @mouseover="onHover()" @mouseleave="onHover(false)" class="pokemon-sprite">
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import Pokemon from "./Pokemon";
import Intents from "./foes/Intents.vue";
import Helper from "./Helper.vue"
import HealthBar from "./HealthBar.vue"
import suffleArray from "@/engine/Shuffle";
import cloneDeep from "lodash.clonedeep"
import { inject } from 'vue'

@Options({
  name: "FoePokemon",
  components: {
    Intents,
    Helper,
    HealthBar
  },
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

  public pattern = []
  public patternSettings!: any

  public resolvedPattern = []
  public canShowIntents: boolean = true

  private emitter: any = inject('emitter')

  get foePosition(): string {
    const currentBackground: string = this.$store.getters.getBackgroundUsed
    return `left: ${this.$store.state.backgrounds.slots[currentBackground]['foes'][this.index]['left']}%; bottom: ${this.$store.state.backgrounds.slots[currentBackground]['foes'][this.index]['bottom']}%;`
  }

  get spriteClass(): string {
    if(this.$store.getters.selectedCard === null) return ''
    return this.$store.state.cards.dataCards[this.$store.getters.selectedCard]['target'] ? 'target' : ''
  }

  get shieldSprite() {
    return require('@/assets/img/interface/shield4.png')
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

    return nextMove
  }

  get helpToolTipStyle(): string {
    const multiplier = Object.keys(this.nextMove).filter((key) => key !== "type").length
    const yTranslate = (60 * multiplier)
    return `transform: translateX(-50%) translateY(-100%) translateY(-${yTranslate}px)`
  }

  public onClick(): void {
    if(this.$store.getters.selectedCard) {
      this.emitter.emit("foePokemonHasBeenClicked", this.index)
    }
  }

  public onHover(enter: boolean = true): void {
    if(enter) { 
      this.$store.commit("mouseOver", this.index)
      this.mouseOver = true
    } 
    else {
      this.$store.commit("mouseOver", null)
      this.mouseOver = false
    }
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

  public playMove() {
    this.emitter.emit("playFoeMove", {
      user: this.index,
      effect: this.nextMove,
    })
    
    this.canShowIntents = false
  }

  protected faint(): void {
    this.$store.commit("setFoeFainted", this.index)
    this.emitter.emit("fainted", this.index)
  }

  private onEndPlayerTurn() {
    this.setBlock(0)
  }

  private onNewTurn() {
    this.canShowIntents = true
  }

  private applyBuff(payload) {
    if(payload.buffAttack) {
      this.$store.commit("buffFoeAttack", {index: this.index, buff: payload.buffAttack})
      }
    if(payload.buffDefense) {
      this.$store.commit("buffFoeDefense", {index: this.index, buff: payload.buffDefense})
    }
  }

  private onDamage(payload) {
    if(payload.target === this.index) {
      const damageDealt = this.takeDamage(payload.value, payload.type, payload.ignoreBlock)
      if(payload.leechlife) {
        const leechValue = Math.floor((damageDealt * (payload.leechlife / 100)))
        this.emitter.emit("heal", {user : payload.user, value: leechValue})
      }
    }
    if(payload.user === this.index) {
      this.playAttackAnim()
    }
  }

  private onBlock(payload) {
    if(payload.user === this.index) {
      this.gainBlock(payload.value)
    }
  }

  private onSelfDamage(payload) {
    if(payload.user === this.index) {
      this.takeDamage(payload.value, null, true)
    }
  }

  private onSelfBuff(payload) {
    if(payload.user === this.index) {
      this.applyBuff(payload)
    }
  }

  private onTargetBuff(payload) {
    if(payload.target === this.index) {
      this.applyBuff(payload)
    }
  }

  private onHeal(payload) {
    if(payload.user === this.index) {
      if(!payload.percentage) {
        this.heal(payload.value)
      }
      else {
        const totalValue = Math.floor((this.maxHealth * (payload.value / 100)))
        this.heal(totalValue)
      }
    }
  }

  private onFoeTurn(payload) {
    if(payload === this.index) {
      this.playMove()
    }
  }

  public mounted() {

    this.attack = this.baseAttack;
    this.defense = this.baseDefense;
    this.currentHealth = this.maxHealth
    this.fainted = false

    this.emitter.on("endPlayerTurn", this.onEndPlayerTurn)
    this.emitter.on("startNewTurn", this.onNewTurn)
    this.emitter.on("damage", this.onDamage)
    this.emitter.on("block", this.onBlock)
    this.emitter.on('selfdamage', this.onSelfDamage)
    this.emitter.on("selfbuff", this.onSelfBuff)
    this.emitter.on('targetbuff', this.onTargetBuff)
    this.emitter.on("heal", this.onHeal)
    this.emitter.on("foeTurn", this.onFoeTurn)
  }

  public beforeUnmount() {
    this.emitter.off("endPlayerTurn", this.onEndPlayerTurn)
    this.emitter.off("startNewTurn", this.onNewTurn)
    this.emitter.off("damage", this.onDamage)
    this.emitter.off("block", this.onBlock)
    this.emitter.off('selfdamage', this.onSelfDamage)
    this.emitter.off("selfbuff", this.onSelfBuff)
    this.emitter.off('targetbuff', this.onTargetBuff)
    this.emitter.off("heal", this.onHeal)
    this.emitter.off("foeTurn", this.onFoeTurn)
  }
}

</script>

<style lang="scss" scoped>
@import './style/pokemon.scss';
@import './style/foePokemon.scss';
@import '../animations/pokemon/pokemon.scss';
@import '../animations/pokemon/foePokemon.scss';
</style>
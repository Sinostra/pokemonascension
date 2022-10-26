<template>
  <div class="card" :class="cardClass" @mousedown="startDrag()" @mouseup="endDrag()">
    <div class="background-img" :style="{'background-image':`url(${background})`}"></div>
    <div class="cost" :style="(getFontSize(1))" :class="costClass">
      <img :src="costBackground">
      {{ dataCard[id]['cost'] }}
    </div>
    
    <div class="name" :style="(getFontSize(0.7))">{{dataCard[id]['name']}}</div>

    <div class="illustration" :style="{'background-image':'url(' + illustrationBackground + ')'}"></div>

    <div class="category" :style="(getCategoryStyle(0.6))">{{dataCard[id]['category']}}</div>
    
    <div class="tooltip" :class="cardDamageTooltipClass" :style="(getFontSize(0.8))">
      <div v-html="dynamicToolTip"></div>
      <div v-if="dataCard[id]['exhaust']" class="bold">Exhaust</div>
    </div>
  </div>
</template>

<script lang="ts">
import Card from "./Card"
import { Options } from "vue-class-component";
import getTypeMatchup from "@/engine/TypeMatchup";
import { inject } from 'vue'

@Options({
  name: "PlayableCard",
  props: {
    state: String
  }
})

export default class PlayableCard extends Card {
  public state!: string

  public isPlayingDrawAnim: boolean = false
  public isPlayingDiscardFromSelectAnim: boolean = false
  public isPlayingDiscardFromHand: boolean = false

  private emitter: any = inject('emitter')

  get cardClass(): string {
    const type: string = this.dataCard[this.id]['effect']['type']
    const draw = this.isPlayingDrawAnim ? 'draw' : ''
    const playable = this.dataCard[this.id]['cost'] <= this.$store.state.battle.currentEnergy ? 'playable' : ''
    const discardFromSelect = this.isPlayingDiscardFromSelectAnim ? 'discardFromSelect' : ''
    const discardFromHand = this.isPlayingDiscardFromHand ? 'dicardFromHand' : ''
    
    if(!draw  && !discardFromSelect && !discardFromHand && playable) {
      return `${type} ${playable}`
    }
    return `${type} ${draw} ${discardFromSelect} ${discardFromHand}`
  }

  get costClass() {
    return this.dataCard[this.id]['cost'] > this.$store.state.battle.currentEnergy ? "too-much" : ""
  }

  get dynamicToolTip() {

    if(!this.dataCard[this.id]['effect']['params']['value'] && !this.dataCard[this.id]['effect']['params']['value']) {
      return this.dataCard[this.id]['tooltip']
    } 

    let finalDamage = 0
    let finalBlock = 0
    if(this.dataCard[this.id]['effect']['params']['value']) {
      finalDamage = this.dataCard[this.id]['effect']['params']['value'] + this.$store.state.battle.playerStats.attack;
      if(this.$store.state.battle.typesHover) {
        if(this.cardDamageTooltipModifier < 1) finalDamage = Math.floor(finalDamage * this.cardDamageTooltipModifier)
        else finalDamage = Math.ceil(finalDamage * this.cardDamageTooltipModifier)
      }
    }

    if(this.dataCard[this.id]['effect']['params']['value']) {
      finalBlock = this.dataCard[this.id]['effect']['params']['value'] + this.$store.state.battle.playerStats.defense;
    }

    return this.dataCard[this.id]['tooltip'].replace('§', finalDamage).replace('µ', finalBlock)

  }

  get cardDamageTooltipModifier() {
    if(!this.$store.state.battle.typesHover) return 1
    return getTypeMatchup(this.dataCard[this.id]['effect']['type'], this.$store.state.battle.typesHover)
  }

  get cardDamageTooltipClass() {
    let tooltipClass = ''
    if(this.cardDamageTooltipModifier > 1) tooltipClass = 'super-effective'
    else if(this.cardDamageTooltipModifier < 1) tooltipClass = 'not-very-effective'
    return tooltipClass
  }

  public startDrag() {
    if(this.dataCard[this.id]['cost'] <= this.$store.state.battle.currentEnergy) {
      this.$emit("dragCard")
    }
  }

  public endDrag() {
    this.$emit("dragEnd")
  }

  public playDrawAnim() {
    if(!this.isPlayingDrawAnim) {
      this.isPlayingDrawAnim = true
      setTimeout(() => { this.isPlayingDrawAnim = false }, 1000 )
    }
  }

  public playDiscardFromSelectAnim() {
    if(!this.isPlayingDiscardFromSelectAnim) {
      this.isPlayingDiscardFromSelectAnim = true
      setTimeout(() => {
        this.isPlayingDiscardFromSelectAnim = false
        this.emitter.emit("discardFromSelectAnimEnded")
      }, 500 )
    }
  }

  public playDiscardFromHandAnim() {
    if(!this.isPlayingDiscardFromHand) {
      this.isPlayingDiscardFromHand = true
      setTimeout(() => {
        this.isPlayingDiscardFromHand = false
        this.$emit('discardAnimEnded')
      }, 500 )
    }
  }

  public mounted() {
    
    if(this.state === 'drawn') {
      this.playDrawAnim()
    }

    else if(this.state === 'discardedFromSelect') {
      this.playDiscardFromSelectAnim()
    }

    else if(this.state === 'discardedFromHand') {
      this.playDiscardFromHandAnim()
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style/card.scss';
@import '../animations/cards/draw.scss';
@import '../animations/cards/discard.scss';
</style>
<template>
  <div class="card" :class="cardClass" @click.stop="onClick()" :style="{'background-image':`url(${background})`}">
    <div class="cost" :style="(getFontSize(0.6))">
      <img :src="costBackground">
      {{ dataCard[id]['cost'] }}
    </div>
    <div class="name" :style="(getFontSize(0.5))">{{dataCard[id]['name']}}</div>

    <div class="illustration" :style="{'background-image':'url(' + illustrationBackground + ')'}"></div>

    <div class="category" :style="(getCategoryStyle(0.4))">{{dataCard[id]['category']}}</div>
    
    <div class="tooltip" :class="cardDamageTooltipClass" :style="(getFontSize(0.6))" v-html="dynamicToolTip"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import dataCard from "@/store/constantData/cards/data-cards"

@Options({
  name: "Card",
  props: {
    id: String,
    state: String
  }
})

export default class Card extends Vue {
  private id!: string
  private state!: string

  private dataCard = dataCard

  private isPlayingDrawAnim: boolean = false
  private isPlayingDiscardFromSelectAnim: boolean = false
  private isPlayingDiscardFromHand: boolean = false

  get cardClass(): string {
    const type: string = this.dataCard[this.id]['type']
    const draw = this.isPlayingDrawAnim ? 'draw' : ''
    const playable = this.dataCard[this.id]['cost'] <= this.$store.state.battle.currentEnergy ? 'playable' : ''
    const discardFromSelect = this.isPlayingDiscardFromSelectAnim ? 'discardFromSelect' : ''
    const discardFromHand = this.isPlayingDiscardFromHand ? 'dicardFromHand' : ''
    
    if(!draw  && !discardFromSelect && !discardFromHand && playable) {
      return `${type} ${playable}`
    }
    return `${type} ${draw} ${discardFromSelect} ${discardFromHand}`
  }

  get background() {
    return require(`@/assets/img/cards/bords/${this.dataCard[this.id]['rarity']}2.png`)
  }

  get costBackground() {
    return require(`@/assets/img/cards/bords/${this.dataCard[this.id]['rarity']}_round.png`)
  }

  get illustrationBackground(): string {
    return require(`@/assets/img/cards/illustrations/${this.id}.jpg`)
  }

  get categoryBackground() {
    return require(`@/assets/img/cards/${this.dataCard[this.id]['category']}_${this.dataCard[this.id]['rarity']}.png`)
  }

  get dynamicToolTip() {

    if(!this.dataCard[this.id]['effect']['damage'] && !this.dataCard[this.id]['effect']['block']) {
      return this.dataCard[this.id]['tooltip']
    } 

    let finalDamage = 0
    let finalBlock = 0
    if(this.dataCard[this.id]['effect']['damage']) {
      finalDamage = this.dataCard[this.id]['effect']['damage'] + this.$store.state.battle.playerAttack;
      if(this.$store.state.battle.typesHover) {
        if(this.cardDamageTooltipModifier < 1) finalDamage = Math.floor(finalDamage * this.cardDamageTooltipModifier)
        else finalDamage = Math.ceil(finalDamage * this.cardDamageTooltipModifier)
      }
    }

    if(this.dataCard[this.id]['effect']['block']) {
      finalBlock = this.dataCard[this.id]['effect']['block'] + this.$store.state.battle.playerDefense;
    }

    return this.dataCard[this.id]['tooltip'].replace('§', finalDamage).replace('µ', finalBlock)

  }

  get cardDamageTooltipModifier() {
    if(!this.$store.state.battle.typesHover) return 1
    return this.getTypeMatchup(this.dataCard[this.id]['type'], this.$store.state.battle.typesHover)
  }

  get cardDamageTooltipClass() {
    let tooltipClass = ''
    if(this.cardDamageTooltipModifier > 1) tooltipClass = 'super-effective'
    else if(this.cardDamageTooltipModifier < 1) tooltipClass = 'not-very-effective'
    return tooltipClass
  }

  getFontSize(multiplier = 1): string {
    return `font-size: ${(this.$store.state.settings.baseFontSize) * multiplier}px;`
  }

  getCategoryStyle(multiplier = 1) {
    const fontSize = this.getFontSize(multiplier)
    const background = `background-image :url(${this.categoryBackground});`
    return fontSize + background
  }

  getTypeMatchup(attackingType, defendingTypes) {
    const attackMachups = this.$store.state.types.dataTypes[attackingType]
    let multiplier = 1

    defendingTypes.forEach((type) => {
      multiplier *= attackMachups[type]
    })

    return multiplier
  }

  private onClick() {
    if(this.dataCard[this.id]['cost'] <= this.$store.state.battle.currentEnergy) {
      this.$emit('cardClicked')
    }
  }

  private playDrawAnim() {
    if(!this.isPlayingDrawAnim) {
      this.isPlayingDrawAnim = true
      setTimeout(() => { this.isPlayingDrawAnim = false }, 1000 )
    }
  }

  private playDiscardFromSelectAnim() {
    if(!this.isPlayingDiscardFromSelectAnim) {
      this.isPlayingDiscardFromSelectAnim = true
      setTimeout(() => {
        this.isPlayingDiscardFromSelectAnim = false
        this.$emit('discardAnimEnded')
      }, 500 )
    }
  }

  private playDiscardFromHandAnim() {
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
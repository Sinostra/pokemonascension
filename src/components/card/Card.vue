<template>
  <div class="card" :class="cardClass" @click.stop="onClick()" :style="{'background-image':'url(' + background + ')'}">
    <div class="cost" :style="(getFontSize(0.6))">
      <img :src="costBackground">
      {{ $store.state.cards.dataCards[id]['cost'] }}
    </div>
    <div class="name" :style="(getFontSize(0.5))">{{$store.state.cards.dataCards[id]['name']}}</div>

    <div class="illustration" :style="{'background-image':'url(' + illustrationBackground + ')'}"></div>

    <div class="category" :style="(getCategoryStyle(0.4))">{{$store.state.cards.dataCards[id]['category']}}</div>
    
    <div class="tooltip" :style="(getFontSize(0.6))">{{$store.state.cards.dataCards[id]['tooltip']}}</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

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
  private isPlayingDrawAnim: boolean = false
  private isPlayingDiscardFromSelectAnim: boolean = false
  private isPlayingDiscardFromHand: boolean = false

  public mounted() {
    
    if(this.state === 'drawn') {
      this.playDrawAnim()
    }

    else if(this.state === 'discardedFromSelect') {
      this.playDiscardFromSelectAnim()
    } 
  }

  get cardClass(): string {
    const type: string = this.$store.state.cards.dataCards[this.id]['type']
    const draw = this.isPlayingDrawAnim ? 'draw' : ''
    const playable = this.$store.state.cards.dataCards[this.id]['cost'] <= this.$store.state.battle.currentEnergy ? 'playable' : ''
    const discardFromSelect = this.isPlayingDiscardFromSelectAnim ? 'discardFromSelect' : ''
    const discardFromHand = this.isPlayingDiscardFromHand ? 'dicardFromHand' : ''
    
    if(!draw  && !discardFromSelect && !discardFromHand && playable) {
      return `${type} ${playable}`
    }
    return `${type} ${draw} ${discardFromSelect} ${discardFromHand}`
  }

  get background() {
    const card = this.$store.state.cards.dataCards[this.id]
    return require('../../assets/img/cards/bords/' + card['rarity'] + '2.png')
  }

  get costBackground() {
    const rarity: string = this.$store.state.cards.dataCards[this.id]['rarity']
    return require(`../../assets/img/cards/bords/${rarity}_round.png`)
  }

  get illustrationBackground(): string {
    return require('../../assets/img/cards/illustrations/' + this.id + '.jpg')
  }

  get categoryBackground() {
    const card = this.$store.state.cards.dataCards[this.id]
    return require('../../assets/img/cards/' + card['category'] + '_' + card['rarity'] + '.png')
  }

  getFontSize(multiplier = 1): string {
    return `font-size: ${(this.$store.state.settings.baseFontSize) * multiplier}px;`
  }

  getCategoryStyle(multiplier = 1) {
    const fontSize = 'font-size: ' + (this.$store.state.settings.baseFontSize) * multiplier + 'px;'
    const background = 'background-image :url(' + this.categoryBackground + ');'
    return fontSize + background
  }

  private onClick() {
    if(this.$store.state.cards.dataCards[this.id]['cost'] <= this.$store.state.battle.currentEnergy) {
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
}
</script>

<style lang="scss" scoped>
@import './style/card.scss';
@import '../animations/cards/draw.scss';
@import '../animations/cards/discard.scss';
</style>
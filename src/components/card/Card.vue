<template>
  <div class="card" :class="cardClass" @click.stop="onClick()" :style="{'background-image':`url(${background})`}">
    <div class="cost" :style="(getFontSize(0.6))">
      <img :src="costBackground">
      {{ dataCurrentCard['cost'] }}
    </div>
    <div class="name" :style="(getFontSize(0.5))">{{dataCurrentCard['name']}}</div>

    <div class="illustration" :style="{'background-image':'url(' + illustrationBackground + ')'}"></div>

    <div class="category" :style="(getCategoryStyle(0.4))">{{dataCurrentCard['category']}}</div>
    
    <div v-if="dataCurrentCard['damage']" class="tooltip" :style="(getFontSize(0.6))">{{dynamicToolTip}}</div>
    <div v-else class="tooltip" :style="(getFontSize(0.6))">{{dataCurrentCard['tooltip']}}</div>
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

  private readonly dataCurrentCard = dataCard[this.id]

  private isPlayingDrawAnim: boolean = false
  private isPlayingDiscardFromSelectAnim: boolean = false
  private isPlayingDiscardFromHand: boolean = false

  private typesHover: string[] | null = null

  get cardClass(): string {
    const type: string = this.dataCurrentCard['type']
    const draw = this.isPlayingDrawAnim ? 'draw' : ''
    const playable = this.dataCurrentCard['cost'] <= this.$store.state.battle.currentEnergy ? 'playable' : ''
    const discardFromSelect = this.isPlayingDiscardFromSelectAnim ? 'discardFromSelect' : ''
    const discardFromHand = this.isPlayingDiscardFromHand ? 'dicardFromHand' : ''
    
    if(!draw  && !discardFromSelect && !discardFromHand && playable) {
      return `${type} ${playable}`
    }
    return `${type} ${draw} ${discardFromSelect} ${discardFromHand}`
  }

  get background() {
    return require(`@/assets/img/cards/bords/${this.dataCurrentCard['rarity']}2.png`)
  }

  get costBackground() {
    return require(`@/assets/img/cards/bords/${this.dataCurrentCard['rarity']}_round.png`)
  }

  get illustrationBackground(): string {
    return require(`@/assets/img/cards/illustrations/${this.id}.jpg`)
  }

  get categoryBackground() {
    return require(`@/assets/img/cards/${this.dataCurrentCard['category']}_${this.dataCurrentCard['rarity']}.png`)
  }

  get dynamicToolTip() {

    if(!this.typesHover) return this.dataCurrentCard['tooltip'].replace('§', this.dataCurrentCard['damage'])

    else {
      const attackMachups = this.$store.state.types.dataTypes[this.dataCurrentCard['type']]
      let multiplier = 1
      this.typesHover.forEach((type) => {
        multiplier *= attackMachups[type]
      })
      const finalDamage = Math.ceil(this.dataCurrentCard['damage'] * multiplier)

      return this.dataCurrentCard['tooltip'].replace('§', finalDamage)
    }
  }

  getFontSize(multiplier = 1): string {
    return `font-size: ${(this.$store.state.settings.baseFontSize) * multiplier}px;`
  }

  getCategoryStyle(multiplier = 1) {
    const fontSize = this.getFontSize(multiplier)
    const background = `background-image :url(${this.categoryBackground});`
    return fontSize + background
  }

  private onClick() {
    console.log(dataCard[this.id])
    if(this.dataCurrentCard['cost'] <= this.$store.state.battle.currentEnergy) {
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

    if(this.dataCurrentCard['damage'] && !this.dataCurrentCard['damageAOE']) {
      this.$store.subscribeAction((action) => {
        if(action.type === "mouseOver") {
          this.typesHover = action.payload
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style/card.scss';
@import '../animations/cards/draw.scss';
@import '../animations/cards/discard.scss';
</style>
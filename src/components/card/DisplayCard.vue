<template>
  <div class="card" :class="dataCard[id]['effect']['type']">
    <img class="background-img" :src="background">
    <div class="cost" :style="(getFontSize(1))">
      <img :src="costBackground">
      {{ dataCard[id]['cost'] }}
    </div>
    
    <div class="name" :style="(getFontSize(0.7))">{{dataCard[id]['name']}}</div>

    <div class="illustration" :style="{'background-image':'url(' + illustrationBackground + ')'}"></div>

    <div class="category" :style="(getCategoryStyle(0.6))">{{dataCard[id]['category']}}</div>
    
    <div class="tooltip" :style="(getFontSize(0.8))">
      <div v-html="dynamicToolTip"></div>
      <div v-if="dataCard[id]['exhaust']" class="bold">Exhaust</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import dataCard from "@/store/constantData/cards/data-cards"

@Options({
  name: "DisplayCard",
  props: {
    id: String,
  }
})

export default class DisplayCard extends Vue {
  public id!: string

  public dataCard = dataCard

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

    if(!this.dataCard[this.id]['effect']['params']['damage'] && !this.dataCard[this.id]['effect']['params']['block']) {
      return this.dataCard[this.id]['tooltip']
    } 

    return this.dataCard[this.id]['tooltip'].replace('§', this.dataCard[this.id]['effect']['params']['value']).replace('µ', this.dataCard[this.id]['effect']['params']['value'])

  }

  getFontSize(multiplier = 1): string {
    return `font-size: ${(this.$store.state.settings.baseFontSize) * multiplier}px;`
  }

  getCategoryStyle(multiplier = 1) {
    const fontSize = this.getFontSize(multiplier)
    const background = `background-image :url(${this.categoryBackground});`
    return fontSize + background
  }

}
</script>

<style lang="scss" scoped>
@import './style/displayCard.scss';
</style>
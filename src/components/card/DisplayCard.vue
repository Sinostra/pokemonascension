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
import Card from "./Card"


export default class DisplayCard extends Card {

  get dynamicToolTip() {

    if(!this.dataCard[this.id]['effect']['params']['damage'] && !this.dataCard[this.id]['effect']['params']['block']) {
      return this.dataCard[this.id]['tooltip']
    } 

    return this.dataCard[this.id]['tooltip'].replace('§', this.dataCard[this.id]['effect']['params']['value']).replace('µ', this.dataCard[this.id]['effect']['params']['value'])
  }
}
</script>

<style lang="scss" scoped>
@import './style/displayCard.scss';
</style>
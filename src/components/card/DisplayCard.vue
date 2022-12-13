<template>
  <div class="card" :class="dataCard[id]['effect']['type']">
    <img class="background-img" :src="background">
    <div class="cost" :style="(getFontSize(1))">
      <img :src="costBackground">
      {{ dataCard[id]['cost'] }}
    </div>
    
    <div class="name" :style="(getFontSize(0.7))">{{dataCard[id]['name']}}</div>

    <div class="type-icon"></div>

    <div class="illustration" :style="{'background-image':'url(' + illustrationBackground + ')'}"></div>

    <div class="category" :style="(getCategoryStyle(0.6))">{{dataCard[id]['category']}}</div>
    
    <div class="tooltip" :style="(getFontSize(0.6))">
      <div v-html="dynamicToolTip"></div>
      <div v-if="dataCard[id]['exhaust']" class="bold">Exhaust</div>
    </div>
  </div>
</template>

<script lang="ts">
import Card from "./Card"
import checkEffectContent from "@/engine/CheckEffectContent"

export default class DisplayCard extends Card {

  get dynamicToolTip() {

    let damageValue = 0
    let blockValue = 0 
    let attackEffect = checkEffectContent(this.dataCard[this.id]['effect'], "AttackEffect")
    if(!attackEffect) {
      attackEffect = checkEffectContent(this.dataCard[this.id]['effect'], "MultiAttackEffect")
    }
    if(attackEffect) {
      damageValue = attackEffect.params.value
    }

    let blockEffect = checkEffectContent(this.dataCard[this.id]['effect'], "BlockEffect")
    if(blockEffect) {
      blockValue = blockEffect.params.value
    }

    return this.dataCard[this.id]['tooltip'].replace('§', damageValue).replace('µ', blockValue)
  }
}
</script>

<style lang="scss" scoped>
@import './style/card.scss';
@import './style/displayCard.scss';
</style>
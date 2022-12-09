<template>
  <div class="healthBar">
    <div class="currentHealth" :class="healthBarClass" :style="{'width': getHealthBarPercent() + '%'}"></div>
    <div class="bottom-infos">
      <div class="healthAmount" :style="getFontSize(0.8)">{{currentHealth}}/{{maxHealth}}</div>
      <div class="healthAmount" :style="getFontSize(0.8)">{{attack}}/{{defense}}</div>
    </div>
    <div v-if="block" class="block-wrapper">
      <div class="blockAmount">{{block}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "HealthBar",
  props: {
    currentHealth: Number,
    maxHealth: Number,
    block: Number,
    attack: Number,
    defense: Number,
  }
})

export default class HealthBar extends Vue {
  public currentHealth!: number
  public maxHealth!: number
  public block!: number
  public attack!: number
  public defense!: number

  get healthBarClass(): string {
    if(this.getHealthBarPercent() > 67) return 'green'
    else if(this.getHealthBarPercent() > 33 && this.getHealthBarPercent() <= 67) return 'orange'
    else return 'red'
  }

  public getHealthBarPercent(): number {
    return (this.currentHealth  / this.maxHealth) * 100;
  }

  public getFontSize(multiplier = 1): string {
    return `font-size: ${(this.$store.getters.baseFontSize) * multiplier}px;`
  }
}

</script>

<style lang="scss" scoped>
@import './style/healthBar.scss';
</style>
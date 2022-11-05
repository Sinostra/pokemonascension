<template>
    <div class="pokemon-wrapper" :class="wrapperClass" :style="wrapperStyle" @mouseover="onHover()" @mouseleave="onHover(false)">
      <img class="pokemon-sprite" :src="spritePath" @click="clickPokemon()">
      <Helper v-if="displayHelpTooltip" :id="id"></Helper>
  </div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import Pokemon from "./Pokemon";
import Helper from "./Helper.vue"

@Options({
  name: "DisplayPokemon",
  components: {
    Helper
  },
  props: {
    width: Number,
    displayHelpTooltip: Boolean
  }
})

export default class DisplayPokemon extends Pokemon {
  public width!: number
  public displayHelpTooltip!: boolean

  get wrapperStyle() {
    return `width: ${this.width}%`
  }

  public onHover(enter: boolean = true): void {
    if(enter) {
      this.mouseOver = true
    } 
    else {
      this.mouseOver = false
    } 
  }

  public clickPokemon() {
    this.$emit("clickPokemon", this.id)
  }
}

</script>

<style lang="scss" scoped>
@import './style/pokemon.scss';

.pokemon-wrapper {
  position: relative;

  .help-tooltip {
    transform: translate(-50%, 20%);
  }
}

.pokemon-sprite {
  display: block;
  width: 100%;
}
</style>
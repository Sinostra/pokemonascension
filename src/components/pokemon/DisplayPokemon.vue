<template>
    <div class="pokemon-wrapper" :class="wrapperClass" :style="wrapperStyle" @mouseover="onHover()" @mouseleave="onHover(false)">
      <img class="pokemon-sprite" :src="spritePath" @click="clickPokemon()">
      <div v-if="displayHelpTooltip" class="help-tooltip">
        <div class="pokemon-data">
          <div class="text">{{dataPokemon['name']['english']}}</div>
          <div class="type" v-for="(type, index) in dataPokemon.type" :key="index">
            <img :src="getTpyeIcon(type)" class="type-img">
          </div>
        </div>
        <div class="pokemon-data">
          <div class="text">Weaknesses :</div>
          <div class="type" v-for="(type, index) in weaknesses" :key="index">
            <img :src="getTpyeIcon(type)" class="type-img">
          </div>
        </div>
        <div class="pokemon-data">
          <div class="text">Resistances :</div>
          <div class="type" v-for="(type, index) in resistances" :key="index">
            <img :src="getTpyeIcon(type)" class="type-img">
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import Pokemon from "./Pokemon";

@Options({
  name: "DisplayPokemon",
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
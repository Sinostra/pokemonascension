<template>
    <div class="pokemon-wrapper" :class="wrapperClass" :style="wrapperStyle">
      <div class="size-wrapper" :style="{'width': dataPokemon.size + '%'}" @mouseover="onHover()" @mouseleave="onHover(false)">
        <img class="pokemon-sprite" :src="spritePath" @click="clickStarter()">
        <div class="help-tooltip">
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
  </div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import Pokemon from "./Pokemon";

@Options({
  name: "DisplayPokemon",
  props: {
    width: Number
  }
})

export default class DisplayPokemon extends Pokemon {
  public width!: number

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

  public clickStarter() {
    const starterData = {
      id: this.id,
      deck: this.dataPokemon['starterDeck'],
      hp: this.dataPokemon['baseStats']['hp'],
    }
    this.$store.commit("addPokemon", starterData)
    this.$store.commit("setFoes", this.$store.state.allFoes.dataFoes[0])
    this.$store.commit("startBattle", "forest")
  }
}

</script>

<style lang="scss" scoped>
@import './style/pokemon.scss';

.pokemon-wrapper {
  position: static;

  .size-wrapper {
    position: relative;

    .help-tooltip {
      transform: translate(-50%, 20%);
    }
  }
}

.pokemon-sprite {
  display: block;
  width: 100%;
}
</style>
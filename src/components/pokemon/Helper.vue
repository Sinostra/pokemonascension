<template>
  <div class="help-tooltip" :style="getFontSize()">
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
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import dataDex from "@/constantData/pokedex"
import typeMatchups from "@/engine/Types";

@Options({
  name: "Helper",
  props: {
    id: String,
  }
})

export default class Helper extends Vue {
  private id!: string
  public dataPokemon = dataDex[this.id]

  get allTypesMatchups() {
    const pokemonTypes = this.dataPokemon['type']
    const allTypes = typeMatchups
    return Object.keys(allTypes).reduce((recipient, type) => {
      let multiplier = 1
      pokemonTypes.forEach(t => {
        multiplier *= allTypes[type][t]
      });
      recipient[type] = multiplier
      return recipient
    }, {})
  }

  get weaknesses() {
    const allTypes = typeMatchups
    return Object.keys(allTypes).reduce((recipient, type) => {
      if(this.allTypesMatchups[type] > 1) {
        recipient.push(type)
      }
      return recipient
    }, [] as string[])
  }

  get resistances() {
    const allTypes = typeMatchups
    return Object.keys(allTypes).reduce((recipient, type) => {
      if(this.allTypesMatchups[type] < 1) {
        recipient.push(type)
      }
      return recipient
    }, [] as string[])
  }

  public getTpyeIcon(type) {
    return require(`@/assets/img/types/${type}.png`)
  }

  public getFontSize(multiplier = 1): string {
    return `font-size: ${(this.$store.getters.baseFontSize) * multiplier}px;`
  }
}

</script>

<style lang="scss" scoped>
@import './style/helper.scss';
</style>
<template>
    <div class="pokemon-wrapper">
      <img :src="spritePath" :style="{'width': $store.state.pokedex.constantDex[id]['size'] + '%'}" :class="animClass">
  </div>
</template>

<script lang="ts">
import Pokemon from "./Pokemon";

export default class FoePokemon extends Pokemon {}

</script>

<style lang="scss" scoped>
@import './style/pokemon.scss';
</style>
<template>
    <div class="pokemon-wrapper">
      <img :src="spritePath" :style="{'width': $store.state.pokedex.constantDex[id]['size'] + '%'}" :class="animClass">
      <div class="healthBar-infos-wrapper">
        <div class="healthBar">
          <div class="currentHealth" :class="healthBarClass" :style="{'width': healthBarPercents + '%'}"></div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import Pokemon from "./Pokemon";

export default class PlayerPokemon extends Pokemon {
  public mounted() {
    console.log((this.currentHealth  / this.maxHealth) * 100)
  }
}

</script>

<style lang="scss" scoped>
@import './style/pokemon.scss';
img {
  transform: scaleX(-1);
}
</style>
<template>
  <div class="center-interface">
    <div class="overlay">
      <div v-if="currentStep === 1">
        <div class="txt">Hello, and welcome to our Pokemon center, we heal your Pokemon back to perfect health !</div>
        <div class="btn" @click="healPlayerPokemon()">Heal</div>
      </div>

      <div v-if="currentStep === 2">
        <div class="txt">Thank you for waiting, we've restored your Pokémon to full health.</div>
        <div class="txt">We hope to see you again !</div>
        <div class="btn" @click="$store.dispatch('playNextStep')">Continue</div>
      </div>
      </div>
  </div>
  
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "PokemonCenter",
})

export default class PokemonCenter extends Vue {
  public currentStep = 1

  public healPlayerPokemon() {
    this.$store.commit("healAllPlayerPokemon")
    this.currentStep++
  }

}
</script>
<style lang="scss" scoped>

.center-interface {
  display: flex;
  justify-content: center;
  align-items: center;

  .overlay {
    background: rgba($color: #000000, $alpha: 0.7);
    border-radius: 5px;
    padding: 20px;
    color: #fff;
  }

  .txt {
    padding-bottom: 30px;
    text-align: center;
  }

  .btn {
    text-align: center;
    background: #182552;
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
    border: 2px #fff solid;
    padding: 10px 15px;
    margin: 10px auto 0;
  }
}
</style>
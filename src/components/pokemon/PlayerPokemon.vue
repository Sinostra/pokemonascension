<template>
    <div class="pokemon-wrapper" :style="playerPosition">
      <div class="size-wrapper" :style="{'width': $store.state.pokedex.constantDex[id]['size'] + '%'}">
        <img :src="spritePath" :class="animClass">
        <div class="healthBar-infos-wrapper">
          <div class="healthBar">
            <div class="currentHealth" :class="healthBarClass" :style="{'width': getHealthBarPercent() + '%'}"></div>
            <div class="healthAmount" :style="getFontSize()">{{currentHealth}} / {{maxHealth}} </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import Pokemon from "./Pokemon";

@Options({
  name: "PlayerPokemon",
})

export default class PlayerPokemon extends Pokemon {
  get playerPosition(): string {
    const currentBackground: string = this.$store.state.battle.backgroundUsed
    return `left: ${this.$store.state.backgrounds.slots[currentBackground]['player']['left']}%; bottom: ${this.$store.state.backgrounds.slots[currentBackground]['player']['bottom']}%;`
  }

  private inflictDamage() {
    this.currentHealth--
  }

  public mounted() {
    // setTimeout(() => {this.playReturnAnim()}, 1000)
    this.$store.subscribeAction((action, state) => {
      // console.log(action.type)
      if(action.type === "clickPlayer") {
        console.log(action.type)
        this.inflictDamage()
      }
      // console.log(action.payload)
    })
  }
}

</script>

<style lang="scss" scoped>
@import './style/pokemon.scss';
@import './style/playerPokemon.scss';
</style>
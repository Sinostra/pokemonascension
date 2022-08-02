<template>
    <div class="pokemon-wrapper" :style="foePosition" :class="animClass">
      <div class="size-wrapper" :style="{'width': $store.state.pokedex.constantDex[id]['size'] + '%'}">
        <div class="bottom-wrapper" @click.stop="onClick()">
          <div class="healthBar-infos-wrapper">
            <div class="healthBar">
              <div class="currentHealth" :class="healthBarClass" :style="{'width': getHealthBarPercent() + '%'}"></div>
              <div class="healthAmount" :style="getFontSize()">{{currentHealth}} / {{maxHealth}} </div>
            </div>
            <div class="block-wrapper">
              {{block}}
            </div>
            <div class="types-wrapper">
              <div class="type" v-for="(type, index) in $store.state.pokedex.constantDex[id]['type']" :key="index">
                <img :src="getPokemonTpyeIcon($store.state.pokedex.constantDex[id]['type'][index])" class="type-img">
              </div>
            </div>
          </div>
          <img :src="spritePath" :class="spriteClass" @mouseover="onHover()" @mouseleave="onHover(false)">
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import Pokemon from "./Pokemon";

@Options({
  name: "FoePokemon",
  props: {
    index: Number,
  }
})

export default class FoePokemon extends Pokemon {
  private index!: number;

  get foePosition(): string {
    const currentBackground: string = this.$store.state.battle.backgroundUsed
    return `left: ${this.$store.state.backgrounds.slots[currentBackground]['foes'][this.index]['left']}%; bottom: ${this.$store.state.backgrounds.slots[currentBackground]['foes'][this.index]['bottom']}%;`
  }

  get spriteClass(): string {
    if(this.$store.getters.selectedCard === null) return ''
    return this.$store.state.cards.dataCards[this.$store.getters.selectedCard]['target'] ? 'target' : ''
  }

  private onClick(): void {
    if(this.$store.getters.selectedCard) {
      this.$store.dispatch("foePokemonHasBeenClicked", this.index)
    }
  }

  private onHover(enter: boolean = true): void {
    if(enter) this.$store.dispatch("mouseOver", this.$store.state.pokedex.constantDex[this.id]['type'])
    else this.$store.dispatch("mouseOver", null)
  }

  public mounted() {
    this.$store.subscribeAction((action) => {
      if(action.type === "damageFoe") {
        if(action.payload.target === this.index) {
          this.takeDamage(action.payload.damage, action.payload.type, action.payload.ignoreBlock)
        } 
      }

      if(action.type === "damageAllFoes") {
        this.takeDamage(action.payload.damage, action.payload.type, action.payload.ignoreBlock)
      }
    })
  }
}

</script>

<style lang="scss" scoped>
@import './style/pokemon.scss';
@import './style/foePokemon.scss';
@import '../animations/pokemon/pokemon.scss';
@import '../animations/pokemon/foePokemon.scss';
</style>
<template>
    <div>
      <img :src="spritePath" :style="{'width': $store.state.pokedex.constantDex[id]['size'] + '%'}" :class="animClass">
      <button @click="playAttackAnim()">Attack</button>
      <button @click="playReturnAnim()">Return</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    id: String,
  }
})

export default class Pokemon extends Vue {
  id!: string
  isPlayingAttackAnim: boolean = false
  isPlayingReturnAnim: boolean = false

  get spritePath() {
    return require(`./../../assets/img/sprites/${this.$store.state.settings.pokemonSpritesExtension}/${this.id}.${this.$store.state.settings.pokemonSpritesExtension}`)
  }

  get animClass(): string {
    let animClass: string = ''
    if(this.isPlayingReturnAnim) animClass = 'return'
    else if (this.isPlayingAttackAnim) animClass = 'attack' 
    return animClass
  }

  private playAttackAnim(): void {
    if(!this.isPlayingAttackAnim) {
      this.isPlayingAttackAnim = true
      setTimeout(() => { this.isPlayingAttackAnim = false }, 350 )
    }
  }

  private playReturnAnim(): void {
    if(!this.isPlayingReturnAnim) {
      this.isPlayingReturnAnim = true
    }
  }

}
</script>

<style lang="scss" scoped>

.attack {
  animation: attack .35s linear;
}

.return {
  animation: return 1s linear forwards;
}

@keyframes attack {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(100px);
  }
  0% {
    transform: translateX(0);
  }
}

@keyframes return {
    0% {
      filter: none;
    }

    1% {
      filter: brightness(10)
    }

    10% {
      filter: brightness(10) brightness(0.5) sepia(1) hue-rotate(311deg) saturate(10) brightness(3);
    }

    20% {
      filter: brightness(10) brightness(0.5) sepia(1) hue-rotate(311deg) saturate(10) brightness(1.8);
    }

    30% {
      opacity: 0.8;
    }

    40% {
      opacity: 0.6;
    }

    50% {
      opacity: 0.4;
    }

    60% {
      opacity: 0.2;
    }

    90% {
      opacity: 0;
    }

    100% {
      filter: brightness(10) brightness(0.5) sepia(1) hue-rotate(311deg) saturate(10) brightness(1.8);
      opacity: 0;
    }
}
</style>
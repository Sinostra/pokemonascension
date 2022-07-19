<template>
    <div>
      <img :src="spritePath">
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

  get spritePath() {
    return require(`./../../assets/img/sprites/${this.$store.state.settings.pokemonSpritesExtension}/${this.id}.${this.$store.state.settings.pokemonSpritesExtension}`)
  }

  mounted() {
    console.log(this.$store.state.settings.pokemonSpritesExtension)
  }
}


</script>
<template>
  <div class="deck-wrapper">
    <DisplayCard
      v-for="(card, index) in deck"
      :key="index"
      :id="card"
    ></DisplayCard>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DisplayCard from "./DisplayCard.vue"

@Options({
  name: "DisplayDeck",
  props: {
    deck: Array,
  },
  components: {
    DisplayCard
  }
})

export default class DisplayDeck extends Vue {
  public deck!: string[]
}
</script>

<style lang="scss" scoped>
@import './style/displayDeck.scss';
</style>
<template>
    <div class="card draw" @click="$emit('cardClicked')">{{id}}</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "Card",
  props: {
    id: String,
  }
})

export default class Card extends Vue {
  private id!: string
}
</script>

<style lang="scss" scoped>
@import './style/card.scss';
</style>
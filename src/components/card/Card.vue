<template>
    <div class="card draw">{{id}}</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    id: String,
  }
})

export default class Card extends Vue {
    private id!: string
    public mounted() {
        console.log('card mounted' + this.id)
    }
}
</script>

<style lang="scss" scoped>
@import './style/card.scss';
</style>
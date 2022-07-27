<template>
    <div class="card draw"></div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class Card extends Vue {
    public mounted() {
        console.log('card mounted')
    }
}
</script>

<style lang="scss" scoped>
@import './style/card.scss';
</style>
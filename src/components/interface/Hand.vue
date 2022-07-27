<template>
    <div class="hand"><Card></Card></div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Card from '../card/Card.vue'

@Options({
    components: {
        Card
    }
})
export default class Hand extends Vue {

}

</script>

<style lang="scss" scoped>
@import './style/hand.scss';
</style>
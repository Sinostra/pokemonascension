<template>
    <div class="hand-area" @mouseup="onMouseUp()"></div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
    name: "HandArea",
})

export default class HandArea extends Vue {
    public onMouseUp() {
        console.log('mouse up card area')
    }
}

</script>

<style lang="scss" scoped>
@import './style/handArea.scss';
</style>
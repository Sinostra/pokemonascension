<template>
    <div class="game-interface" :style="{'background-image':'url(' + getBackground() + ')'}"></div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";


export default class GameInterface extends Vue {
    public getBackground() {
        return require('./../../assets/img/interface/top_border.jpg')
    }
}
</script>
<style lang="scss" scoped>
.game-interface {
    width: 100%;
    height: 6%;
    background-position: bottom;
}
</style>
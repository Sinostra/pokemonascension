<template>
    <div class="game-interface" :style="`height: ${height}%`">
        <div class="town-map" @click="onGameInterfaceClicked()"></div>
    </div>
    <div v-if="displayMap" class="map-wrapper">
        <div class="map"></div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";


@Options({
    name: "GameInterface",
})
export default class GameInterface extends Vue {
    public height = 100
    public displayMap = false
    public onGameInterfaceClicked() {
        this.displayMap = !this.displayMap
        this.height = this.displayMap ? 6 : 100
        this.$emit(this.displayMap ? "displayInterface" : "hideInterface")
    }
}
</script>
<style lang="scss" scoped>
@import './style/gameInterface.scss';
</style>
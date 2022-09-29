<template>
    <div class="game-interface" :style="`height: ${height}%`">
        <div class="town-map" @click="onGameInterfaceClicked()"></div>
    </div>
    <div v-if="displayMap" class="map-wrapper">
        <div class="map" v-if="currentMap">
            <div v-for="floor in currentMap" :key="floor" class="row" :class="`row-${floor}`">
                <div v-for="room in floor" :key="room" class="room" :class="`room-${room}`"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";


@Options({
    name: "GameInterface",
    props: {
        currentMap: Array
    }
})
export default class GameInterface extends Vue {
    public height = 100
    public displayMap = false
    public currentMap!: any
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
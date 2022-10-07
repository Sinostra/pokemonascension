<template>
    <div class="game-interface" :style="`height: ${height}%`">
        <div class="town-map" @click="onMapClicked()"></div>
        <div class="team" @click="onTeamClicked()"></div>
    </div>
    <!-- <div v-if="displayMap" class="map-wrapper">
        <div class="map" v-if="currentMap">
            <div v-for="floor in currentMap" :key="floor" class="row" :class="`row-${floor.length}`">
                <div v-for="room in floor" :key="room" class="room" :class="getRoomClass(room)" @click="setPlayerPosition(room)"></div>
            </div>
        </div>
    </div>
    <div v-if="displayTeam" class="team-wrapper"></div> -->
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
    public height = 6
    public displayMap = false
    public displayTeam = false
    public currentMap!: any
    public playerPositionOnMap = null
    public playerCurrentFloor = -1

    private onGameInterfaceClicked(message) { 
        this.height = this.displayMap || this.displayTeam ? 6 : 100
        this.$emit(message)
    }

    public onMapClicked() {
        this.displayMap = !this.displayMap
        this.displayTeam = false
        this.onGameInterfaceClicked(this.displayMap ? "displayInterface" : "hideInterface")
    }

    public onTeamClicked() {
        this.displayTeam = !this.displayTeam
        this.displayMap = false
        this.onGameInterfaceClicked(this.displayTeam ? "displayInterface" : "hideInterface")
    }

    public setPlayerPosition(room) {
        this.playerCurrentFloor = room.floor
    }

    public getRoomClass(room) {
        const roomClass = `room-${room.type}`
        let floorClass = ''
        if(room.floor === this.playerCurrentFloor + 1) {
            floorClass = 'clickable'
        }

        return `${roomClass} ${floorClass}`
    }
}
</script>
<style lang="scss" scoped>
@import './style/gameInterface.scss';
</style>
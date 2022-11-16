<template>
    <div class="game-interface">
        <div class="interface-item town-map" @click="clickInterfaceButton('GameMap')"></div>
        <div class="interface-item team" :class="!$store.getters.getPlayerTeam.length ? 'inactive' : ''" @click="clickInterfaceButton('PlayerTeam')"></div>
        <div class="interface-item fullscreen-toggle" :class="fullscreen ? 'notfullscreen' : 'fullscreen'" @click="toggleFullscreen()"></div>
    </div>

    <div v-if="currentDisplayedComp" class="component-overlay">
        <component v-bind:is="currentDisplayedComp"></component>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PlayerTeam from "./gameinterfacecomponents/PlayerTeam.vue"
import GameMap from "./gameinterfacecomponents/GameMap.vue"


@Options({
    name: "GameInterface",
    components: {
        PlayerTeam,
        GameMap
    }
})
export default class GameInterface extends Vue {
    public currentDisplayedComp = ''
    public fullscreen = false

    public clickInterfaceButton(buttonName) {
        if(buttonName === this.currentDisplayedComp) {
            this.currentDisplayedComp = ''
        }

        else {
            this.currentDisplayedComp = buttonName
        }
    }

    public toggleFullscreen() {
        this.fullscreen = !this.fullscreen
        if(this.fullscreen) {
            document.documentElement.requestFullscreen();
        }

        else {
            document.exitFullscreen();
        }
        
    }
}
</script>
<style lang="scss" scoped>
@import './style/gameInterface.scss';
</style>
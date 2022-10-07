<template>
    <div class="game-interface">
        <div class="town-map" @click="clickInterfaceButton('GameMap')"></div>
        <div class="team" @click="clickInterfaceButton('PlayerTeam')"></div>
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

    public clickInterfaceButton(buttonName) {
        if(buttonName === this.currentDisplayedComp) {
            this.currentDisplayedComp = ''
        }

        else {
            this.currentDisplayedComp = buttonName
        }
    }
}
</script>
<style lang="scss" scoped>
@import './style/gameInterface.scss';
</style>
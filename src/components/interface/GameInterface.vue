<template>
    <div class="game-interface">
        <div class="town-map" @click="displayMap = !displayMap"></div>
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
    public displayMap = false
}
</script>
<style lang="scss" scoped>
@import './style/gameInterface.scss';
</style>
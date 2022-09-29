<template>
    <div class="interface-wrapper" :style="`height: ${height}%`">
        <MapGenerator></MapGenerator>
        <GameInterface
        @displayInterface="height = 100"
        @hideInterface="height = 6"
        ></GameInterface>
    </div>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component'
import MapGenerator from './interface/MapGenerator.vue'
import GameInterface from './interface/GameInterface.vue'

@Options({
    name: "Interface",
    components: {
        MapGenerator,
        GameInterface,
    }
})
export default class Interface extends Vue {
    public height = 6;
}
</script>
<style lang='scss' scoped>
.interface-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    z-index: 6;
}
</style>
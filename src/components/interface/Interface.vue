<template>
    <div class="interface-wrapper">
        <GameInterface/>
        <BattleInterface/>
    </div>
</template>

<script>
import GameInterface from './GameInterface.vue'
import BattleInterface from './BattleInterface.vue'
export default {
    name: "Interface",

    components: {
        GameInterface,
        BattleInterface
    },

    data: function() {
        return {

        }
    },

    methods: {

    }
}
</script>
<style lang='scss' scoped>
.interface-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    display: flex;
    flex-direction: column;
    z-index: 1;
}
</style>
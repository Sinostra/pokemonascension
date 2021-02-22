<template>
    <div class="interface-wrapper" @click="onClick()">
        <GameInterface/>
    </div>
</template>

<script>
import GameInterface from './interface/GameInterface.vue'
export default {
    name: "Interface",

    components: {
        GameInterface,
    },

    data: function() {
        return {

        }
    },

    methods: {
        onClick: function() {
            if(this.$store.state.battle.selectedCard != null) {
                this.$store.dispatch('changeinterfaceClicked', true)
            }
        }
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
    display: flex;
    flex-direction: column;
    z-index: 1;
}
</style>
<template>
    <div class="interface-wrapper" v-on:click.left="onLeftClick()" v-on:click.right="onRightClick($event)">
        <GameInterface/>
        <ChoiceInterface v-if="!$store.state.battle.isBattleOnGoing"/>
    </div>
</template>

<script>
import GameInterface from './interface/GameInterface.vue'
import ChoiceInterface from './interface/ChoiceInterface.vue'
export default {
    name: "Interface",

    components: {
        GameInterface,
        ChoiceInterface
    },

    data: function() {
        return {

        }
    },

    methods: {
        onLeftClick: function() {
            if(this.$store.state.battle.selectedCard != null) {
                this.$store.dispatch('changeinterfaceClicked', true)
            }
        },

        onRightClick(e) {
            e.preventDefault()
            this.$store.dispatch('changerightClicked', true)
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
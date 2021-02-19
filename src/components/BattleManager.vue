<template>
    <div class="battlemanager">
        <BattleScene v-on:card-played="detectedCardPlayed = true"/>
        <BattleInterface :detectedCardPlayed="detectedCardPlayed" :cardUnselected="$store.state.battle.selectedCard" v-on:cardDiscarded="detectedCardPlayed = false"/>
    </div>
</template>

<script>
import BattleScene from './battlemanager/BattleScene.vue'
import BattleInterface from './battlemanager/BattleInterface.vue'
export default {
    name: "BattleManager",

    components: {
        BattleScene,
        BattleInterface
    },

    data: function() {
        return {
            detectedCardPlayed: false
        }
    },

    methods: {

    }
}
</script>

<style lang='scss' scoped>
.battlemanager {
    position: absolute;
    width: 100%;
    height: 100%;
}

</style>



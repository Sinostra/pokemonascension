<template>
    <div class="battlemanager">
        <BattleScene 
            :cardPlayed="$store.state.battle.cardPlayed"
            :turnEnded="$store.state.battle.playerTurn"
        />
        <BattleInterface 
            :cardClickedInterface="$store.state.battle.interfaceClicked" 
            :cardClickedPokemon="$store.state.battle.pokemonClicked" 
            :cardPlayed="$store.state.battle.cardPlayed"
            :turnStarted="$store.state.battle.playerTurn"
            :rightClicked="$store.state.battle.rightClicked"
        />
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



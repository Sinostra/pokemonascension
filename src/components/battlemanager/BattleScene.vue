<template>
    <div class="battle-wrapper">
        <PlayerPokemon :id="'025'"></PlayerPokemon>
        <FoePokemon
            v-for="(pokemon, index) in $store.state.foes.foeTeam"
            :key="index"
            :id="$store.state.foes.foeTeam[index]"
            :index="index"
        >
        </FoePokemon>
    </div>
</template>

<script>

import PlayerPokemon from './../pokemon/PlayerPokemon.vue'
import FoePokemon from './../pokemon/FoePokemon.vue'
export default {
    name: "BattleScene",

    components: {
        PlayerPokemon,
        FoePokemon,
    },


    watch: {
    },

    data: function(){
        return {}
    },

}
</script>

<style lang='scss' scoped>
.battle-wrapper {
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
}
</style>



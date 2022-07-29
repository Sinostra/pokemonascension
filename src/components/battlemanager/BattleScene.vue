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

    },

    methods: {

        //Renvoie le multiplicateur des faiblesse et résistances
        getTypeMatchup(attackingType, targetPokemon) {
            var attackMachups = this.types[attackingType]
            var defenderType = this.dex[targetPokemon['id']]['type']
            var multiplier = 1

            defenderType.forEach((type) => {
                multiplier *= attackMachups[type]
            })

            return multiplier
        },

    },

    computed: {

    },

    mounted: function() {

        this.$store.subscribe((changeCardSelection, state) => {
            // console.log(changeCardSelection.type)
            // console.log(changeCardSelection.payload)
        })
    }
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



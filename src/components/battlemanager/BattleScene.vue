<template>
    <div class="battle-wrapper">
        <PlayerPokemon :id="activePokemon"></PlayerPokemon>
        <FoePokemon
            v-for="(pokemon, index) in $store.getters.getFoeTeam"
            :key="index"
            :id="pokemon.id"
            :maxHealth="pokemon.stats.hp"
            :baseAttack="pokemon.stats.attack"
            :baseDefense="pokemon.stats.defense"
            :pattern="pokemon.patternSetting.pattern"
            :patternSettings="pokemon.patternSetting"
            :index="index"
        >
        </FoePokemon>
    </div>
</template>

<script lang="ts">

import PlayerPokemon from './../pokemon/PlayerPokemon.vue'
import FoePokemon from './../pokemon/FoePokemon.vue'
import { Options, Vue } from 'vue-class-component'

@Options({
    name: "BattleScene",
    components: {
        PlayerPokemon,
        FoePokemon,
    }
})

export default class BattleScene extends Vue {


    get activePokemon() {
        return this.$store.state.playerTeam.team[this.$store.getters.getActiveIndex].id
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



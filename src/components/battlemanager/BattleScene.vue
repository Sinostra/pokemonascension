<template>
    <div class="battle-wrapper">
        <PlayerPokemon :id="activePokemon"></PlayerPokemon>
        <FoePokemon
            v-for="(pokemon, index) in $store.state.foes.foeTeam"
            :key="index"
            :id="pokemon.id"
            :maxHealth="pokemon.maxHealth"
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



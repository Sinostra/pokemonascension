<template>
    <div v-for="(pokemon, index) in $store.getters.getPlayerTeam"
    :key="index"
    class="team-member-wrapper"
    >
        <DisplayPokemon
        :id="pokemon.id"
        :width="10"
        :displayHelpTooltip="false"
        ></DisplayPokemon>
    </div>
    
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DisplayPokemon from "../../pokemon/DisplayPokemon.vue"
import DisplayCard from "../../card/DisplayCard.vue"

@Options({
    name: "PlayerTeam",
    components: {
        DisplayPokemon,
        DisplayCard
    }
})
export default class PlayerTeam extends Vue {}
</script>
<style lang="scss" scoped>
@import '../style/playerTeam.scss';
</style>
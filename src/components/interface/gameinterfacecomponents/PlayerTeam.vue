<template>
    <div class="player-team">
        <div class="team-wrapper">
            <div v-for="(pokemon, index) in $store.getters.getPlayerTeam"
            :key="index"
            class="team-member-wrapper"
            >
                <div class="pokemon-info">
                    <DisplayPokemon
                    :id="pokemon.id"
                    :width="getWidth(index)"
                    :displayHelpTooltip="false"
                    @click.stop="selectedPokemon = index"
                    ></DisplayPokemon>

                    <div class="healthBar-infos-wrapper" :style="`width: ${getWidth(index)}%`">
                        <div class="healthBar">
                            <div class="currentHealth" :class="getHealthBarClass(index)" :style="{'width': getHealthBarPercent(index) + '%'}"></div>
                            <div class="bottom-infos">
                                <div class="healthAmount" :style="getFontSize(0.8)">{{getCurrentHealth(index)}}/{{getMaxHealth(index)}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="deck-container">
            <DisplayDeck
                :deck="selectedPokemonDeck"
            ></DisplayDeck>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DisplayPokemon from "../../pokemon/DisplayPokemon.vue"
import DisplayDeck from "../../card/DisplayDeck.vue"
import pokedex from "@/constantData/pokedex"

@Options({
    name: "PlayerTeam",
    components: {
        DisplayPokemon,
        DisplayDeck
    }
})
export default class PlayerTeam extends Vue {

    public selectedPokemon = 0;

    get selectedPokemonDeck() {
        return this.$store.getters.getPlayerTeam[this.selectedPokemon].deck
    }

    public getMaxHealth(index) {
        const id = this.$store.getters.getPlayerTeam[index]['id']
        return pokedex[id]['baseStats']['hp']
    }

    public getWidth(index) {
        const id = this.$store.getters.getPlayerTeam[index]['id']
        return pokedex[id]['size']
    }

    public getCurrentHealth(index) {
        return this.$store.getters.getPlayerTeam[index]['remainingHp']
    }

    public getHealthBarPercent(index) {
        return (this.getCurrentHealth(index) / this.getMaxHealth(index) * 100)
    }

    public getHealthBarClass(index) {
        if(this.getHealthBarPercent(index) > 67) return 'green'
        else if(this.getHealthBarPercent(index) > 33 && this.getHealthBarPercent(index) <= 67) return 'orange'
        else return 'red'
    }

    public getFontSize(multiplier = 1): string {
        return `font-size: ${(this.$store.getters.baseFontSize) * multiplier}px;`
    }
}
</script>
<style lang="scss" scoped>
@import '../style/playerTeam.scss';
</style>
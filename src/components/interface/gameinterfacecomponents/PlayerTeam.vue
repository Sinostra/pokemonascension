<template>
    <div class="team-wrapper">
        <div v-for="(pokemon, index) in $store.getters.getPlayerTeam"
        :key="index"
        class="team-member-wrapper"
        >
            <DisplayPokemon
            :id="pokemon.id"
            :width="100"
            :displayHelpTooltip="false"
            ></DisplayPokemon>

            <div class="healthBar-infos-wrapper">
                <div class="healthBar">
                    <div class="currentHealth" :class="getHealthBarClass(index)" :style="{'width': getHealthBarPercent(index) + '%'}"></div>
                    <div class="bottom-infos">
                        <div class="healthAmount" :style="getFontSize(0.8)">{{getCurrentHealth(index)}}/{{getMaxHealth(index)}}</div>
                    </div>
                </div>
            </div>
        </div>
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
export default class PlayerTeam extends Vue {

    public getMaxHealth(index) {
        const id = this.$store.getters.getPlayerTeam[index]['id']
        return this.$store.getters.getDex[id]['baseStats']['hp']
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
        return `font-size: ${(this.$store.state.settings.baseFontSize) * multiplier}px;`
    }
}
</script>
<style lang="scss" scoped>
@import '../style/playerTeam.scss';
</style>
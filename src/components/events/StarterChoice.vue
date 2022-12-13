<template>
    <div class="starter-choice">
        <div class="starters-wrapper">
            <DisplayPokemon
                :id="'004'"
                :width="80"
                :displayHelpTooltip="true"
                @clickPokemon="clickStarter($event)"
            ></DisplayPokemon>
            <DisplayPokemon
                :id="'007'"
                :width="90"
                :displayHelpTooltip="true"
                @clickPokemon="clickStarter($event)"
            ></DisplayPokemon>
            <DisplayPokemon
                :id="'001'"
                :width="95"
                :displayHelpTooltip="true"
                @clickPokemon="clickStarter($event)"
            ></DisplayPokemon>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DisplayPokemon from "../pokemon/DisplayPokemon.vue"

@Options({
  name: "StarterChoice",
    components: {
        DisplayPokemon
    },
})

export default class StarterChoice  extends Vue {

    public clickStarter(id: string) {
        
        const starterData = {
            id: id,
            deck: this.$store.getters.getDex[id]['starterDeck'],
            hp: this.$store.getters.getDex[id]['baseStats']['hp'],
            maxHp: this.$store.getters.getDex[id]['baseStats']['hp'],
            stacks: {},
        }
        this.$store.commit("addPokemon", starterData)
        this.$store.commit("setGameMap")
        this.$store.dispatch('playNextStep')
    }

}
</script>
<style lang="scss" scoped>

.starters-wrapper {
    position: absolute;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-end;
    top: 31%;
    transform: translateX(32%);
    width: 60%;
}

.pokemon-sprite {
    display: block;
    width: 14%;
    cursor: pointer;

    &:hover {
        filter: drop-shadow(0 0 0.50rem #f2cd4c) drop-shadow(2px 2px 2px #ffcc00);
    }
}

</style>
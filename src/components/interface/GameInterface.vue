<template>
    <div class="game-interface" :style="{'background-image':'url(' + getBackground() + ')'}"></div>
    <div class="starter-choice">
        <div class="starters-wrapper">
            <DisplayPokemon :id="'004'" :width="100"></DisplayPokemon>
            <DisplayPokemon :id="'007'" :width="100"></DisplayPokemon>
            <DisplayPokemon :id="'001'" :width="95"></DisplayPokemon>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DisplayPokemon from "../pokemon/DisplayPokemon.vue"

@Options({
  name: "GameInterface",
    components: {
        DisplayPokemon
    },
})

export default class GameInterface extends Vue {
    public getBackground() {
        return require('./../../assets/img/interface/top_border.jpg')
    }
}
</script>
<style lang="scss" scoped>
.game-interface {
    width: 100%;
    height: 6%;
    background-position: bottom;
}

.starter-choice {
    position: relative;
    width: 100%;
    height: 94%;

    .starters-wrapper {
        position: absolute;
        display: flex;
        justify-content: space-evenly;
        align-items: flex-end;
        top: 35%;
        transform: translateX(19%);
        width: 75%;
    }

    .pokemon-sprite {
        display: block;
        width: 14%;
        cursor: pointer;

        &.bulba {
            width: 15%;
        }

        &:hover {
            filter: drop-shadow(0 0 0.50rem #f2cd4c) drop-shadow(2px 2px 2px #ffcc00);
        }
    }
}
</style>
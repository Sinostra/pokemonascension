<template>
    <div class="game-interface" :style="{'background-image':'url(' + getBackground() + ')'}"></div>
    <div class="starter-choice">
        <div class="starters-wrapper">
            <DisplayPokemon :id="'004'" :left="5" :width="30"></DisplayPokemon>
            <DisplayPokemon :id="'007'" :left="45" :width="30"></DisplayPokemon>
            <DisplayPokemon :id="'001'" :left="80" :width="25"></DisplayPokemon>
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
        top: 40%;
        transform: translateX(17%);
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
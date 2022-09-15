<template>
    <div class="game-interface" :style="{'background-image':'url(' + getBackground() + ')'}"></div>
    <div class="starter-choice">
        <div class="starters-wrapper">
            <img class="pokemon-sprite bulba" :src="getStarter('007')">
            <img class="pokemon-sprite bulba" :src="getStarter('004')">
            <img class="pokemon-sprite bulba" :src="getStarter('001')">
        </div>
    </div>
</template>

<script>
export default {
    name: 'GameInterface',

    data: function() {
        return {

        }
    },

    methods: {
        getBackground() {
            return require('./../../assets/img/interface/top_border.jpg')
        },

        getStarter(id) {
            return require(`@/assets/img/sprites/${this.$store.state.settings.pokemonSpritesExtension}/${id}.${this.$store.state.settings.pokemonSpritesExtension}`)
        }
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
        top: 42%;
        transform: translateX(17%);
        width: 75%;
    }

    .pokemon-sprite {
        display: block;

        &.bulba {
            width: 14%;
        }
    }
}
</style>
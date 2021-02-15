<template>
    <div class="battle-wrapper">
        <div class="player-pokemon">
            <Pokemon :number="'010'"/>
        </div>
        <div class="foe-pokemon">
            <Pokemon :number="'009'"/>
            <Pokemon :number="'056'"/>
        </div>
    </div>
</template>

<script>
import Pokemon from './pokemon/Pokemon.vue'
export default {
    name: "Battle",

    data: function(){
        return {
            battle: false
        }
    },

    components: {
        Pokemon,
    },

    methods: {
    }
}
</script>
<style lang='scss' scoped>
.battle-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .player-pokemon, .foe-pokemon {
        position: relative;
        width: 100%;
    }
}
</style>

<style lang='scss'>
.player-pokemon {
    .pokemon-wrapper img {
        transform: scaleX(-1);
    }
}
</style>
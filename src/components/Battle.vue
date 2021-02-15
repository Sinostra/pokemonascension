<template>
    <div class="battle-wrapper">
        <div class="player-pokemon">
            <Pokemon :number="'010'"/>
        </div>
        <div class="foe-pokemon">
            <!-- <Pokemon :number="'014'"/> -->
            <!-- <Pokemon :number="'056'"/> -->
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

    .player-pokemon {
        transform: scaleX(-1);
    }

    .player-pokemon, .foe-pokemon {
        display: flex;
    }
}

</style>
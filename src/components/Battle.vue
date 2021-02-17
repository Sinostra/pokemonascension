<template>
    <div class="battle-wrapper">
        <div class="player-pokemon">
            <Pokemon :number="'025'"/>
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
    .pokemon-wrapper {
        bottom: 81px;
        left: 312px;

        img {
            transform: scaleX(-1);
            margin-bottom: 30px;
        }
    }
}

.foe-pokemon {
    .pokemon-wrapper {
        display: flex;
        flex-direction: column-reverse;

        .heathBar {
            width: 50%;
            border: 1px solid #000;
            height: 10px;
            margin: 0 auto;
            .currentHealth {
                height: 10px;
            }
        }
        .infos {
           width: 50%;
           margin: 0 auto;
        }
        &:first-of-type {
            bottom: 182px;
            left: 241px;
        }

        &:last-of-type {
            bottom: 182px;
            left: 80px;
        }
    }
}
</style>
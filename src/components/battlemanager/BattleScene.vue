<template>
    <div class="battle-wrapper">
        <div class="player-pokemon">
            <Pokemon :number="pokemonInBattle['player']['id']" :pv="pokemonInBattle['player']['pv']" class="player"/>
        </div>
        <div class="foe-pokemon">
            <Pokemon v-for="(pokemon, index) in pokemonInBattle['foes']" :key="index" v-on:card-played="onCardPlayedEvent(index)" :number="pokemonInBattle['foes'][index]['id']" :pv="pokemonInBattle['foes'][index]['pv']" class="foe"/>
        </div>
    </div>
</template>

<script>
import Pokemon from './battlescene/Pokemon.vue'
export default {
    name: "BattleScene",

    data: function(){
        return {
            battle: false,
            pokemonInBattle: {
                player: {id: '025', pv: 45},
                foes: [
                    {id: '009', pv: 45},
                    {id: '056', pv: 45},
                ]
            }
        }
    },

    components: {
        Pokemon,
    },

    methods: {
        onCardPlayedEvent: function(index) {
            this.$emit('card-played')
            this.dealDamage(0, index)
        },

        dealDamage(amount, index) {
            var pokemon = this.pokemonInBattle['foes'][index]
            if(amount > pokemon['pv']) pokemon['pv'] = 0
            else pokemon['pv'] -= amount
        },

        heal(amount, index) {
            var pokemon = this.pokemonInBattle['foes'][index]
            var pokemonPvMax = this.$store.state.pokedex.constantDex[pokemon['id']]['hp']
            if(amount + pokemon['pv'] > pokemonPvMax) pokemon['pv'] = pokemonPvMax
            else pokemon['pv'] += amount
        }
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



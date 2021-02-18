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
    height: 100vh;

    .player-pokemon, .foe-pokemon {
        position: relative;
        width: 100%;
    }
}
</style>

<style lang='scss'>
.player-pokemon {
    .pokemon-wrapper {
        left: 312px;
        bottom: calc(3vw * var(--ratio));
    }
}

.foe-pokemon {
    .pokemon-wrapper {
        
        &:first-of-type {
            bottom: calc(7vw * var(--ratio));
            left: 50%;
            transform: translate(-50%);
        }

        &:last-of-type {
            bottom: calc(7vw * var(--ratio));
            left: 26%;
            transform: translate(-50%);
        }
    }
}
</style>



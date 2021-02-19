<template>
    <div class="battle-wrapper">
        <div class="player-pokemon">
            <Pokemon :number="pokemonInBattle['player']['id']" :pv="pokemonInBattle['player']['pv']" class="player" :style="getWrapperPosition(true)"/>
        </div>
        <div class="foe-pokemon">
            <Pokemon v-for="(pokemon, index) in pokemonInBattle['foes']" :key="index" v-on:card-played="onCardPlayedEvent(index)" :number="pokemonInBattle['foes'][index]['id']" :pv="pokemonInBattle['foes'][index]['pv']" class="foe" :style="getWrapperPosition(false, index)"/>
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
                    {id: '104', pv: 45},
                ]
            }
        }
    },

    components: {
        Pokemon,
    },

    methods: {

        getWrapperPosition(player, index = 0) {
            var backgroundUsed = this.$store.state.battle.backgroundUsed
            if(player) {
                var playerPos = this.$store.state.backgrounds['slots'][backgroundUsed]['player']
                return 'left: ' + playerPos['left'] + '%; bottom: ' + playerPos['bottom'] + '%;'
            }

            else {
                var foesPos = this.$store.state.backgrounds['slots'][backgroundUsed]['foes'][index]
                return 'left: ' + foesPos['left'] + '%; bottom: ' + foesPos['bottom'] + '%;'
            }
        },

        onCardPlayedEvent: function(index) {
            this.$emit('card-played')
            this.dealDamage(5, index)
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
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
}
</style>

<style lang='scss'>

</style>



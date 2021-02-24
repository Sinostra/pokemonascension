<template>
    <div class="battle-wrapper">
        <div class="player-pokemon">
            <Pokemon :number="pokemonInBattle['player']['id']" :pv="pokemonInBattle['player']['pv']" :block="0" :isPlayer="true" class="player" :style="getWrapperPosition(true)"/>
        </div>
        <div class="foe-pokemon">
            <Pokemon v-for="(pokemon, index) in pokemonInBattle['foes']" :key="index" :number="pokemonInBattle['foes'][index]['id']" :pv="pokemonInBattle['foes'][index]['pv']" :block="pokemonInBattle['foes'][index]['block']" :isPlayer="false" class="foe" :style="getWrapperPosition(false, index)" @click="clickOnPokemon(index)"/>
        </div>
    </div>
</template>

<script>
import Pokemon from './battlescene/Pokemon.vue'
export default {
    name: "BattleScene",

    components: {
        Pokemon,
    },

    props: ['cardPlayed'],

    watch: {
        cardPlayed: function(newVal) {
            if(newVal) {
                var selectedCardData = this.$store.state.cards.dataCards[this.$store.state.battle.selectedCard]
                if(selectedCardData['damage'] > 0) {
                    if(selectedCardData['damageAOE']) {
                        for(var i = 0; i < this.pokemonInBattle['foes'].length; i++) {
                            this.dealDamage(selectedCardData['damage'] * selectedCardData['damageTimes'], i)
                        }
                    }
    
                    else {
                        this.dealDamage(selectedCardData['damage'] * selectedCardData['damageTimes'], this.lastClickedPokemon)
                    }
                }

                //Remettre le bool à false permet à la main de déselectionner sa carte et de la défausser
                this.$store.dispatch('changecardPlayed', false)
            }
        }
    },

    data: function(){
        return {
            battle: false,
            pokemonInBattle: {
                player: {id: '025', pv: 45},
                foes: [
                    {id: '009', pv: 45, block: 10},
                    {id: '104', pv: 45, block: 10},
                    {id: '017', pv: 45, block: 10}
                ]
            },

            lastClickedPokemon: null
        }
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

        dealDamage(amount, index) {
            var ignoresBlock = this.$store.state.cards.dataCards[this.$store.state.battle.selectedCard]['ignoreBlock']
            var pokemon = this.pokemonInBattle['foes'][index]
            if(ignoresBlock || pokemon['block'] == 0) {
                if(amount >= pokemon['pv']) {
                    pokemon['pv'] = 0
                    this.pokemonInBattle['foes'].splice(this.pokemonInBattle['foes'][index], 1)
                } 
                else pokemon['pv'] -= amount
            }

            else {
                if(amount <= pokemon['block']) {
                    pokemon['block'] -= amount
                }

                else {
                    var difference = amount - pokemon['block']
                    pokemon['block'] = 0
                    pokemon['pv'] -= difference
                }
            }
        },

        heal(amount, index) {
            var pokemon = this.pokemonInBattle['foes'][index]
            var pokemonPvMax = this.$store.state.pokedex.constantDex[pokemon['id']]['hp']
            if(amount + pokemon['pv'] > pokemonPvMax) pokemon['pv'] = pokemonPvMax
            else pokemon['pv'] += amount
        },

        clickOnPokemon(index) {
            if(this.$store.state.battle.selectedCard != null) {
                this.lastClickedPokemon = index
                this.$store.dispatch('changepokemonClicked', true)
            }
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



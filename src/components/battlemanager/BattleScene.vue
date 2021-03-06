<template>
    <div class="battle-wrapper">
        <div class="player-pokemon">
            <Pokemon
                :number="pokemonInBattle['player']['id']"
                :pv="pokemonInBattle['player']['pv']"
                :block="pokemonInBattle['player']['block']"
                :isPlayer="true" class="player"
                :style="getWrapperPosition(true)"
                :playAttackAnim="pokemonInBattle['player']['attackAnim']"
            />
        </div>
        <div class="foe-pokemon">
            <Pokemon
                v-for="(pokemon, index) in pokemonInBattle['foes']" :key="index"
                :number="pokemonInBattle['foes'][index]['id']"
                :pv="pokemonInBattle['foes'][index]['pv']"
                :block="pokemonInBattle['foes'][index]['block']"
                :isPlayer="false" class="foe"
                :style="getWrapperPosition(false, index)"
                :intent="pokemonInBattle['foes'][index]['pattern'][0]"
                :turnPlayed="pokemonInBattle['foes'][index]['turnPlayed']"
                :playAttackAnim="pokemonInBattle['foes'][index]['attackAnim']"
                @click="clickOnPokemon(index)"
            />
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

    props: [
        'cardPlayed',
        'turnEnded'
    ],

    watch: {
        cardPlayed: function(newVal) {
            if(newVal) {
                var selectedCardData = this.$store.state.cards.dataCards[this.$store.state.battle.selectedCard]
                if(selectedCardData['damage'] > 0) {
                    if(selectedCardData['damageAOE']) {
                        this.getFoes().forEach((pokemon, index) => {
                            this.dealDamage(selectedCardData['damage'] * selectedCardData['damageTimes'], selectedCardData['ignoreBlock'], index)
                        })
                    }
    
                    else {
                        this.dealDamage(selectedCardData['damage'] * selectedCardData['damageTimes'], selectedCardData['ignoreBlock'], this.lastClickedPokemon)
                    }

                    this.playAttackAnim(this.pokemonInBattle['player'])
                }

                if(selectedCardData['block'] > 0) {
                    this.pokemonInBattle['player']['block'] += selectedCardData['block']
                }

                //Remettre le bool à false permet à la main de déselectionner sa carte et de la défausser
                this.$store.dispatch('changecardPlayed', false)
            }
        },

        turnEnded: function(newVal) {
            if(!newVal) {
                this.getFoes().forEach(pokemon => {
                    pokemon['block'] = 0
                })
                this.playEnnemyTurn().then(() => {

                    setTimeout(() => {
                        this.pokemonInBattle['player']['block'] = 0
                        this.getFoes().forEach(pokemon => {
                            pokemon['turnPlayed'] = false
                        })
    
                        this.$store.dispatch('changePlayerTurn', true)
                    }, 1000)
                })
            }
        }
    },

    data: function(){
        return {
            battle: false,
            pokemonInBattle: {
                player: {
                    id: '025',
                    pv: 45,
                    block: 0,
                    attackAnim: false,
                    fainted: false
                },
                foes: [
                    {
                        id: '009',
                        pv: 45,
                        block: 0,
                        pattern: this.$store.state.pokedex.constantDex['009']['pattern'],
                        attackAnim: false,
                        turnPlayed: false,
                        fainted: false
                    },

                    {
                        id: '104',
                        pv: 45,
                        block: 0,
                        pattern: this.$store.state.pokedex.constantDex['104']['pattern'],
                        attackAnim: false,
                        turnPlayed: false,
                        fainted: false
                    },

                    {
                        id: '017',
                        pv: 45,
                        block: 0,
                        pattern: this.$store.state.pokedex.constantDex['017']['pattern'],
                        attackAnim: false,
                        turnPlayed: false,
                        fainted: false
                    }
                ]
            },

            lastClickedPokemon: null,
            timeBeforeAttack: 1000
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

        dealDamage(amount, ignoresBlock, index = 'player') {
            if(index == 'player') var pokemon = this.pokemonInBattle['player']
            else var pokemon = this.pokemonInBattle['foes'][index]

            if(ignoresBlock || pokemon['block'] == 0) {
                if(amount >= pokemon['pv']) {
                    pokemon['pv'] = 0
                    pokemon['fainted'] = true
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

        heal(amount, index = 'player') {
            if(index == 'player') var pokemon = this.pokemonInBattle['player']
            else var pokemon = this.pokemonInBattle['foes'][index]

            var pokemonPvMax = this.$store.state.pokedex.constantDex[pokemon['id']]['hp']
            if(amount + pokemon['pv'] > pokemonPvMax) pokemon['pv'] = pokemonPvMax
            else pokemon['pv'] += amount
        },

        clickOnPokemon(index) {
            if(this.$store.state.battle.selectedCard != null && !this.pokemonInBattle['foes'][index]['fainted']) {
                this.lastClickedPokemon = index
                this.$store.dispatch('changepokemonClicked', true)
            }
        },

        playEnnemyTurn() {
            return new Promise((resolve) => {
                var counter = this.getFoes().length

                if(counter == 0){
                    resolve()
                    return
                }  

                var pokemon = this.getFoes()[counter -1]

                this.playFoeAttack(pokemon).then(() => {
                    if(counter - 1 == 0) resolve()
                    else {
                        counter--
                        pokemon = this.getFoes()[counter -1]
                        this.playFoeAttack(pokemon).then(() => {
                            if(counter - 1 == 0) resolve()
                            else {
                                counter--
                                pokemon = this.getFoes()[counter -1]
                                this.playFoeAttack(pokemon).then(() => {resolve()})
                            }
                        })
                    }
                })
            })
        },

        playFoeAttack(pokemon) {

            return new Promise((resolve) => {

                setTimeout(() => {
    
                    var moveThisTurn = pokemon['pattern'].shift()
                    if(moveThisTurn['damage'] > 0) {
                        this.dealDamage(moveThisTurn['damage'], false)
                        this.playAttackAnim(pokemon)
                    }
        
                    if(moveThisTurn['block'] > 0) {
                        pokemon['block'] += moveThisTurn['block']
                    }
        
                    pokemon['pattern'].push(moveThisTurn)
                    pokemon['turnPlayed'] = true
                    resolve()
                }, this.timeBeforeAttack)
            })


        },

        playAttackAnim(pokemon) {
            pokemon['attackAnim'] = true
            setTimeout(() => {
                pokemon['attackAnim'] = false
            }, 350)
        },

        getFoes() {
            return this.pokemonInBattle.foes.filter((foe) => !foe.fainted)
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



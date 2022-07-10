<template>
    <div class="battle-wrapper">
        <div class="player-pokemon">
            <Pokemon
                v-if="pokemonInBattle['player']"
                :number="pokemonInBattle['player']['id']"
                :pv="pokemonInBattle['player']['pv']"
                :block="pokemonInBattle['player']['block']"
                :isPlayer="true" class="player"
                :style="getWrapperPosition(true)"
                :playAttackAnim="pokemonInBattle['player']['attackAnim']"
            />
        </div>
        <div v-if="pokemonInBattle['foes']" class="foe-pokemon">
            <Pokemon
                v-for="(pokemon, index) in pokemonInBattle['foes']" :key="index"
                :number="pokemonInBattle['foes'][index]['id']"
                :pv="pokemonInBattle['foes'][index]['pv']"
                :block="pokemonInBattle['foes'][index]['block']"
                :isPlayer="false" class="foe"
                :style="getWrapperPosition(false, index)"
                :intent="getFoeIntent(pokemon)"
                :turnPlayed="pokemonInBattle['foes'][index]['turnPlayed']"
                :playAttackAnim="pokemonInBattle['foes'][index]['attackAnim']"
                @click="clickOnPokemon(index)"
            />
        </div>
    </div>
</template>

<script>

import suffleArray from './../../engine/Shuffle.ts'

import Pokemon from './battlescene/Pokemon.vue'
export default {
    name: "BattleScene",

    components: {
        Pokemon,
    },

    props: [
        'cardPlayed',
        'turnEnded',
        'switchClicked'
    ],

    watch: {
        cardPlayed: function(newVal) {
            if(newVal) {
                var selectedCardData = this.$store.state.cards.dataCards[this.$store.state.battle.selectedCard]
                if(selectedCardData['damage'] > 0) {
                    if(selectedCardData['damageAOE']) {
                        this.getFoes().forEach((pokemon, index) => {
                            this.dealDamage(selectedCardData['damage'] * selectedCardData['damageTimes'], selectedCardData['ignoreBlock'], selectedCardData['type'], index)
                        })
                    }
    
                    else {
                        this.dealDamage(selectedCardData['damage'] * selectedCardData['damageTimes'], selectedCardData['ignoreBlock'], selectedCardData['type'], this.lastClickedPokemon)
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
                        this.$store.dispatch('addTurnToCounter')
                        this.getFoes().forEach(pokemon => {
                            if(this.turn != 0 && this.turn % pokemon['pattern'].length == 0) pokemon['pattern'] = this.setFoePattern(pokemon)
                            pokemon['turnPlayed'] = false
                        })
    
                        
                        this.$store.dispatch('changePlayerTurn', true)
                    }, 1000)
                })
            }
        },

        switchClicked: function(newVal) {
            if(newVal) {
                this.$store.dispatch('changeActivePokemonHealth', this.pokemonInBattle['player']['pv'])
                this.$store.dispatch('switchActivePokemon')
                this.resetPlayerPokemon()
                this.$store.dispatch('changeSwitchClicked', false)
            }
        },
    },

    data: function(){
        return {
            pokemonInBattle: {
                
            },

            lastClickedPokemon: null,
            timeBeforeAttack: 1000
        }
    },

    methods: {

        //Je place les pokémons à l'écran
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



        //J'inflige les dégats
        dealDamage(amount, ignoresBlock, type, index = 'player') {
            if(index == 'player') var pokemon = this.pokemonInBattle['player']
            else var pokemon = this.pokemonInBattle['foes'][index]

            amount = Math.round(amount *= this.getTypeMatchup(type, pokemon))

            if(ignoresBlock || pokemon['block'] == 0) {
                if(amount >= pokemon['pv']) {
                    pokemon['pv'] = 0
                    pokemon['fainted'] = true
                    this.checkFaintedPokemon()
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

        //Je soigne
        heal(amount, index = 'player') {
            if(index == 'player') var pokemon = this.pokemonInBattle['player']
            else var pokemon = this.pokemonInBattle['foes'][index]

            var pokemonPvMax = this.$store.state.pokedex.constantDex[pokemon['id']]['hp']
            if(amount + pokemon['pv'] > pokemonPvMax) pokemon['pv'] = pokemonPvMax
            else pokemon['pv'] += amount
        },



        //Je clique sur un pokémon ennemi
        clickOnPokemon(index) {
            if(this.$store.state.battle.selectedCard != null && !this.pokemonInBattle['foes'][index]['fainted']) {
                this.lastClickedPokemon = index
                this.$store.dispatch('changepokemonClicked', true)
            }
        },



        //Je met un pattern pour un pokémon ennemi donné
        setFoePattern(pokemon) {
            var pattern = this.dex[pokemon['id']]['pattern'].map(x => x)

            var patternRandomOrder = []
            if(this.$store.state.pokedex.constantDex[pokemon['id']]['patternRandomOrder']) {
                patternRandomOrder = this.$store.state.pokedex.constantDex[pokemon['id']]['patternRandomOrder']
            }

            pattern.forEach((move, index) => {
                if(Array.isArray(move)) {
                    var lArray = move.map(x => x)
                    lArray = suffleArray(lArray).shift()
                    pattern[index] = lArray
                }
            })

            pattern = suffleArray(pattern, patternRandomOrder)

            return pattern

        },

        //Je récupère l'intention du pokémon ennemi pour ce tour
        getFoeIntent(pokemon) {
            var currentTurn = this.$store.state.battle.turnCounter

            var pattern = pokemon['pattern'].map(x => x)
            var currentMove = pattern[currentTurn % pattern.length]

            return currentMove
        },



        //Je joue les actions de tous les ennemis => à refaire en fonction récursive
        playEnnemyTurn() {
            return new Promise((resolve) => {
                var counter = this.getFoes().length

                if(counter == 0 || this.pokemonInBattle['player']['fainted']){
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

        //Je joue l'attaque d'un ennemi
        playFoeAttack(pokemon) {

            return new Promise((resolve) => {

                if(this.pokemonInBattle['player']['fainted']) {
                    resolve()
                    return
                }

                setTimeout(() => {

                    var moveThisTurn = this.getFoeIntent(pokemon)
                    if(moveThisTurn['damage'] > 0) {
                        this.dealDamage(moveThisTurn['damage'], false, moveThisTurn['type'])
                        this.playAttackAnim(pokemon)
                    }
        
                    if(moveThisTurn['block'] > 0) {
                        pokemon['block'] += moveThisTurn['block']
                    }
        
                    pokemon['turnPlayed'] = true
                    resolve()
                }, this.timeBeforeAttack)
            })


        },

        //Anim attaque d'un pokémon
        playAttackAnim(pokemon) {
            pokemon['attackAnim'] = true
            setTimeout(() => {
                pokemon['attackAnim'] = false
            }, 350)
        },



        //Retourne les ennemis pas encore ko
        getFoes() {
            return this.pokemonInBattle.foes.filter(foe => !foe.fainted)
        },



        //Check victoire ou défaite
        checkFaintedPokemon() {
            if(this.pokemonInBattle['player']['fainted'] || this.getFoes().length == 0) {
                if(this.getFoes().length == 0) {
                    this.$store.dispatch('setVictory', true)
                } 
                setTimeout(() => {
                    this.$store.dispatch('changeisBattleOnGoing', false)
                    this.$store.dispatch('changePlayerTurn', false)
                    this.$store.dispatch('changeActivePokemonHealth', this.pokemonInBattle['player']['pv'])
                }, 2000)
                
            }
        },


        //Renvoie le multiplicateur des faiblesse et résistances
        getTypeMatchup(attackingType, targetPokemon) {
            var attackMachups = this.types[attackingType]
            var defenderType = this.dex[targetPokemon['id']]['type']
            var multiplier = 1

            defenderType.forEach((type) => {
                multiplier *= attackMachups[type]
            })

            return multiplier
        },


        //Instancier le player
        resetPlayerPokemon() {
            
            var playerPokemon = this.$store.state.playerTeam.team[this.activeIndex]
            if(playerPokemon['pv'] == 0) playerPokemon['pv'] = this.$store.state.pokedex.constantDex[playerPokemon['id']]['hp']
            var player = {
                id: playerPokemon['id'],
                pv: playerPokemon['pv'],
                block: 0,
                attackAnim: false,
                fainted: false
            }
            this.pokemonInBattle['player'] = player
        },

        //Reset la scène de combat
        resetBattleScene() {
            this.$store.dispatch('setVictory', false)
            this.$store.dispatch('resetTurnCounter')
            this.pokemonInBattle = {}

            this.resetPlayerPokemon()


            //Instancier les ennemis
            var foesPokemon = this.$store.state.foes.foeTeam
            var foes = []
            foesPokemon.forEach((pokemonId) => {
                var pokemon = {
                    id: pokemonId,
                    pv: this.$store.state.pokedex.constantDex[pokemonId]['hp'],
                    block: 0,
                    attackAnim: false,
                    turnPlayed: false,
                    fainted: false
                }
                
                pokemon['pattern'] = this.setFoePattern(pokemon)
                foes.push(pokemon)
            })
            this.pokemonInBattle['foes'] = foes
        },
    },

    computed: {
        dex() {
            return this.$store.getters.getDex
        },
        types() {
            return this.$store.getters.getTypes
        },

        turn() {
            return this.$store.getters.getTurn
        },

        activeIndex() {
            return this.$store.getters.getActiveIndex
        }
    },

    mounted: function() {
        this.resetBattleScene()

        this.$store.subscribe((changeCardSelection, state) => {
            // console.log(changeCardSelection.type)
            console.log(changeCardSelection.payload)
        })
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



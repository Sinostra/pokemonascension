import pokedex from '@/constantData/pokedex'
export default {
    state: {
        currentEnergy: 0,
        maxEnergy: 3,
        selectedCard: null,
        draggedCard: null,
        turnCounter: 0,
        indexFoeHover: null,
        battleToDisplay: false,
        isBattleOngoing: false,
        currentWeather: '',
        pokemon: {
            player: [],
            foes: []
        },
        activePlayerIndex: 0,
    },

    mutations: {
        getEnergy(state, amount: number) {
            state.currentEnergy += amount
        },

        spendEnergy(state, amount: number) {
            state.currentEnergy -= amount
        },

        setEnergy(state, amount: number) {
            state.currentEnergy = amount
        },

        selectCard(state, value) {
            state.selectedCard = value
        },

        dragCard(state, value) {
            state.draggedCard = value
        },

        startNewTurn(state) {
            state.turnCounter++
        },

        mouseOver(state, types) {
            state.indexFoeHover = types
        },

        startBattle(state) {
            state.battleToDisplay = true
            state.isBattleOngoing = true
        },
        stopBattle(state) {
            state.isBattleOngoing = false
            state.turnCounter = 0
        },
        stopBattleDisplay(state) {
            state.battleToDisplay = false
        },

        setWeather(state, weather) {
            state.currentWeather = weather 
        },

        changePlayerActiveIndex(state, newIndex) {
            state.activePlayerIndex = newIndex
        },

        setPlayerTeam(state, playerTeam) {
            state.pokemon.player = playerTeam.map((pokemon) => {
                return {
                    id: pokemon.id,
                    fainted: pokemon.fainted,
                    stats: {
                        hp: pokemon.remainingHp,
                        attack: pokedex[pokemon.id].baseStats.attack,
                        defense: pokedex[pokemon.id].baseStats.defense,
                    },
                    stacks: {},
                    deck: pokemon.deck
                }
            })
        },

        setFoes(state, foes) {
            state.pokemon.foes = foes.map((foe) => {
                return {
                    id: foe.id,
                    fainted: false,
                    stats: {
                        hp: foe.baseStats.hp,
                        attack: foe.baseStats.attack,
                        defense: foe.baseStats.defense,
                    },
                    patternSetting: foe.patternSetting,
                    stacks: {},
                }
            })
        },

        changeActivePokemonHealth(state, hp) {
            state.pokemon.player[state.activePlayerIndex].stats.hp = hp
        },

        buffPokemonAttack(state, payload) {
            if(!state.pokemon[payload.target][payload.index]) {
                return
            }

            state.pokemon[payload.target][payload.index]['stats']['attack'] += payload.buff
        },

        buffPokemonDefense(state, payload) {
            if(!state.pokemon[payload.target][payload.index]) {
                return
            }

            state.pokemon[payload.target][payload.index]['stats']['defense'] += payload.buff
        },

        addStackToPokemon(state, payload) {
            const targetType = payload.target === "player" ? payload.target : "foes"
            if(!state.pokemon[targetType][payload.target]['stacks'][payload.type]) {
                state.pokemon[targetType][payload.target]['stacks'][payload.type] = payload.value
            }

            else {
                state.pokemon[targetType][payload.target]['stacks'][payload.type] += payload.value
            }
        },

        setPokemonFainted(state, index) {
            if(!state.pokemon.foes[index]) {
                return
            }
            state.pokemon.foes[index].fainted = true
        }
    },

    getters: {
        selectedCard: state => {
            return state.selectedCard
        },

        getFoeTeam: state => {
            return state.pokemon.foes
        },

        getActiveIndex: state => {
            return state.activePlayerIndex
        },

        getActivePlayerPokemon: state => {
            return state.pokemon.player[state.activePlayerIndex]
        },

        getNotFaintedFoes: state => {
            return state.pokemon.foes.filter((foe) => !foe.fainted)
        }
    }
}
export default {
    state: {
        backgroundUsed: 'forest',

        isBattleOnGoing: true,
        turnCounter: 0,
        victory: false,

        playerTurn: false,

        switchClicked: false,
        switchAllowed: true,

        selectedCard: null,
        interfaceClicked: false,
        pokemonClicked: false,

        rightClicked: false,

        cardPlayed: false,

        currentEnergy: 3,
        maxEnergy: 3,
    },
    mutations: {
        changebackgroundUsed(state, value) {
            state.backgroundUsed = value
        },


        changeisBattleOnGoing(state, value) {
            state.isBattleOnGoing = value
        },
        addTurnToCounter(state) {
            state.turnCounter ++
        },
        resetTurnCounter(state) {
            state.turnCounter = 0
        },
        setVictory(state, value) {
            state.victory = value
        },


        changePlayerTurn(state, value) {
            state.playerTurn = value
        },


        changeSwitchClicked(state, value) {
            state.switchClicked = value
        },
        changeSwitchAllowed(state, value) {
            state.switchAllowed = value
        },


        changeCardSelection(state, value) {
            state.selectedCard = value
        },
        changeinterfaceClicked(state, value) {
            state.interfaceClicked = value
        },

        changerightClicked(state, value) {
            state.rightClicked = value
        },

        changepokemonClicked(state, value) {
            state.pokemonClicked = value
        },
        changecardPlayed(state, value) {
            state.cardPlayed = value
        },


        changeCurrentEnergy(state, value) {
            state.currentEnergy = value
        },
        changeMaxEnergy(state, value) {
            state.maxEnergy = value
        }
    },
    actions: {
        changebackgroundUsed(context, value) {
            context.commit('changebackgroundUsed', value)
        },


        changeisBattleOnGoing(context, value) {
            context.commit('changeisBattleOnGoing', value)
        },
        addTurnToCounter(context) {
            context.commit('addTurnToCounter')
        },
        resetTurnCounter(context) {
            context.commit('resetTurnCounter')
        },
        setVictory(context, value) {
            context.commit('setVictory', value)
        },


        changePlayerTurn(context, value) {
            context.commit('changePlayerTurn', value)
        },


        changeSwitchClicked(context, value) {
            context.commit('changeSwitchClicked', value)
        },
        changeSwitchAllowed(context, value) {
            context.commit('changeSwitchAllowed', value)
        },


        changeCardSelection(context, value) {
            context.commit('changeCardSelection', value)
        },
        changeinterfaceClicked(context, value) {
            context.commit('changeinterfaceClicked', value)
        },
        changepokemonClicked(context, value) {
            context.commit('changepokemonClicked', value)
        },
        changerightClicked(context, value) {
            context.commit('changerightClicked', value)
        },
        changecardPlayed(context, value) {
            context.commit('changecardPlayed', value)
        },


        changeCurrentEnergy(context, value) {
            context.commit('changeCurrentEnergy', value)
        },
        changeMaxEnergy(context, value) {
            context.commit('changeMaxEnergy', value)
        }
    },
    getters: {
        getTurn: state => {
            return state.turnCounter
        },

        getSwitchAllowed: state => {
            return state.switchAllowed
        }
    }
}
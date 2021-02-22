export default {
    state: {
        backgroundUsed: 'forest',


        selectedCard: null,
        interfaceClicked: false,
        pokemonClicked: false,

        cardPlayed: false,

        currentEnergy: 3,
        maxEnergy: 3
    },
    mutations: {
        changebackgroundUsed(state, value) {
            state.backgroundUsed = value
        },


        changeCardSelection(state, value) {
            state.selectedCard = value
        },
        changeinterfaceClicked(state, value) {
            state.interfaceClicked = value
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


        changeCardSelection(context, value) {
            context.commit('changeCardSelection', value)
        },
        changeinterfaceClicked(context, value) {
            context.commit('changeinterfaceClicked', value)
        },
        changepokemonClicked(context, value) {
            context.commit('changepokemonClicked', value)
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
}
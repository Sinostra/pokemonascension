export default {
    state: {
        backgroundUsed: 'forest',
        selectedCard: null,
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
        changeCurrentEnergy(context, value) {
            context.commit('changeCurrentEnergy', value)
        },
        changeMaxEnergy(context, value) {
            context.commit('changeMaxEnergy', value)
        }
    },
}
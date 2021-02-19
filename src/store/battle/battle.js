export default {
    state: {
        backgroundUsed: 'forest',
        selectedCard: null,
        energy: 0
    },
    mutations: {
        changebackgroundUsed(state, value) {
            state.backgroundUsed = value
        },
        changeCardSelection(state, value) {
            state.selectedCard = value
        },
        changeEnergy(state, value) {
            state.energy = value
        }
    },
    actions: {
        changebackgroundUsed(context, value) {
            context.commit('changebackgroundUsed', value)
        },
        changeCardSelection(context, value) {
            context.commit('changeCardSelection', value)
        },
        changeEnergy(context, value) {
            context.commit('changeEnergy', value)
        }
    },
}
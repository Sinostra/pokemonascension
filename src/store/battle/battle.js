export default {
    state: {
        selectedCard: null,
        energy: 0
    },
    mutations: {
        changeCardSelection(state, value) {
            state.selectedCard = value
        },
        changeEnergy(state, value) {
            state.energy = value
        }
    },
    actions: {
        changeCardSelection(context, value) {
            context.commit('changeCardSelection', value)
        },
        changeEnergy(context, value) {
            context.commit('changeEnergy', value)
        }
    },
}
export default {
    state: {
        selectedCard: null
    },
    mutations: {
        changeCardSelection(state, value) {
            state.selectedCard = value
        }
    },
    actions: {
        changeCardSelection(context, value) {
            context.commit('changeCardSelection', value)
        }
    },
}
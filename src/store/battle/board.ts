export default {
    state: {
        drawPile: [],
        hand: ["001","001","001","001","001","001","001"],
        discardPile: [],
        selectedCard: null
    },

    mutations: {
        selectCard(state, value) {
            state.selectedCard = value
        },
    },

    actions: {
        selectCard(context, value) {
            context.commit('selectCard', value)
        },
    }
}
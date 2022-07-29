export default {
    state: {
        drawPile: ["001", "002", "003", "004", "005", "001"],
        hand: [],
        discardPile: [],
        exhaustPile: [],
        selectedCard: null,
        maxCardsInHand: 10
    },

    mutations: {
        selectCard(state, value) {
            state.selectedCard = value
        },

        draw(state) {
            if(state.drawPile.length) {
                state.hand.push(state.drawPile.shift())
            }
        },

        discard(state, index) {
            state.discardPile.push(state.hand.splice(index, 1)[0])
        },

    },

    actions: {
        selectCard(context, value) {
            context.commit("selectCard", value)
        },

        draw(context) {
            context.commit("draw")
        },

        discard(context, index) {
            context.commit("discard", index)
        },
        
    }
}
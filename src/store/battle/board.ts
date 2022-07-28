export default {
    state: {
        drawPile: ["001", "002", "003", "004", "005", "001"],
        hand: [],
        discardPile: [],
        exhaustPile: [],
        selectedCard: null,
        cardBeingDiscarded: null,
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

        discard(state) {
            if(state.selectedCard !== null && state.cardBeingDiscarded === null) {
                state.cardBeingDiscarded = state.selectedCard
                state.selectedCard = null
                setTimeout(() => {
                    state.discardPile.push(state.hand.splice(state.cardBeingDiscarded, 1)[0])
                    state.cardBeingDiscarded = null
                }, 500)
            }
        }
    },

    actions: {
        selectCard(context, value) {
            context.commit("selectCard", value)
        },

        draw(context) {
            context.commit("draw")
        },

        discard(context) {
            context.commit("discard")
        }
    }
}
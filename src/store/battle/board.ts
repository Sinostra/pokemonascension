export default {
    state: {
        drawPile: [],
        hand: [],
        discardPile: ["002", "003", "002", "002",],
        exhaustPile: [],
    },

    mutations: {

        removeCardFromHand(state, index) {
            state.hand.splice(index, 1)[0]
        },

        addCardToDiscardPile(state, id) {
            state.discardPile.push(id)
        }

    },

    actions: {

        removeCardFromHand(context, index) {
            context.commit("removeCardFromHand", index.index)
        },

        addCardToDiscardPile(context, id) {
            context.commit("addCardToDiscardPile", id)
        }
        
    }
}
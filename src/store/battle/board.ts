export default {
    state: {
        drawPile: [],
        hand: [],
        discardPile: ["002", "003", "002", "002",],
        exhaustPile: [],
        selectedCard: null,
        maxCardsInHand: 10
    },

    mutations: {
        selectCard(state, value) {
            state.selectedCard = value
        },


        removeCardFromHand(state, index) {
            state.hand.splice(index, 1)[0]
        },

        addCardToDiscardPile(state, id) {
            state.discardPile.push(id)
        }

    },

    actions: {
        selectCard(context, value) {
            context.commit("selectCard", value)
        },

        removeCardFromHand(context, index) {
            context.commit("removeCardFromHand", index.index)
        },

        addCardToDiscardPile(context, id) {
            context.commit("addCardToDiscardPile", id)
        }
        
    }
}
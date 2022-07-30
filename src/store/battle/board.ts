export default {
    state: {
        drawPile: [],
        hand: [],
        discardPile: ["002", "003"],
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

            else if(state.discardPile.length) {

                for (let i = state.discardPile.length; i > 0; i--) {
                    state.drawPile.push(state.discardPile.shift())
                }

                state.hand.push(state.drawPile.shift())
            }
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

        draw(context) {
            context.commit("draw")
        },

        removeCardFromHand(context, index) {
            context.commit("removeCardFromHand", index)
        },

        addCardToDiscardPile(context, id) {
            context.commit("addCardToDiscardPile", id)
        }
        
    }
}
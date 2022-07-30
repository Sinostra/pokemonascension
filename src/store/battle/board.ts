export default {
    state: {
        drawPile: [],
        hand: [],
        discardPile: ["001", "002", "003", "004", "005", "001"],
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

        discard(state, index) {
            state.discardPile.push(state.hand.splice(index, 1)[0])
        },

        dumpDiscardIntoDraw(state) {
            for (let i = state.discardPile.length; i > 0; i--) {
                state.drawPile.push(state.discardPile.shift())
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

        discard(context, index) {
            context.commit("discard", index)
        },

        dumpDiscardIntoDraw(context) {
            context.commit("dumpDiscardIntoDraw")
        },
        
    }
}
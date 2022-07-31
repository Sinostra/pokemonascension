export default {
    state: {
        drawPile: [],
        hand: [],
        discardPile: ["002", "003", "002", "002",],
        exhaustPile: [],
    },

    mutations: {


        addCardToDiscardPile(state, id) {
            state.discardPile.push(id)
        }

    },

    actions: {


        addCardToDiscardPile(context, id) {
            context.commit("addCardToDiscardPile", id)
        }
        
    }
}
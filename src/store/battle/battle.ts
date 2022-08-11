export default {
    state: {
        backgroundUsed: 'forest',
        currentEnergy: 3,
        maxEnergy: 3,
        selectedCard: null,
        turnCounter: 0
    },
    mutations: {
        getEnergy(state, amount: number) {
            state.currentEnergy += amount
        },

        spendEnergy(state, amount: number) {
            state.currentEnergy -= amount
        },

        selectCard(state, value) {
            state.selectedCard = value
        },

        startNewTurn(state) {
            state.turnCounter++
        },
    },
    actions: {

        getEnergy(context, amount: number) {
            context.commit("getEnergy", amount)
        },

        spendEnergy(context, amount: number) {
            context.commit("spendEnergy", amount)
        },

        selectCard(context, value) {
            context.commit("selectCard", value)
        },
        startNewTurn(context) {
            context.commit("startNewTurn")
        },

        endPlayerTurn() {},
        foeTurn() {},

        foePokemonHasBeenClicked() {},
        playCurrentlySelectedCard() {},
        discardCurrentlySelectedCard() {},
        rightClick() {},

        cardToBeDrawn() {},
        drawIsDone() {},
        cardIsPlaying() {},
        cardDonePlayed() {},

        damageAllFoes() {},
        damage() {},
        playFoeMove() {},
        foeMovePlayed() {},
        gainBlock() {},
        mouseOver() {},
    },
    getters: {
        selectedCard: state => {
            return state.selectedCard
        }
    }
}
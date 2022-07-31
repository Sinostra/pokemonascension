export default {
    state: {
        backgroundUsed: 'forest',
        currentEnergy: 3,
        maxEnergy: 3,
        selectedCard: null,
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

        foePokemonHasBeenClicked() {},
        playCurrentlySelectedCard() {},
        discardCurrentlySelectedCard() {},
        rightClick() {},

        cardToBeDrawn() {},
        drawIsDone() {},
        cardIsPlaying() {},
        cardDonePlayed() {},
    },
    getters: {
        selectedCard: state => {
            return state.selectedCard
        }
    }
}
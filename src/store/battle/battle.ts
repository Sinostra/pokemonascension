export default {
    state: {
        backgroundUsed: 'forest',
        currentEnergy: 3,
        maxEnergy: 3,
    },
    mutations: {
        getEnergy(state, amount: number) {
            state.currentEnergy += amount
        },

        spendEnergy(state, amount: number) {
            state.currentEnergy -= amount
        }
    },
    actions: {

        getEnergy(context, amount: number) {
            context.commit("getEnergy", amount)
        },

        spendEnergy(context, amount: number) {
            context.commit("spendEnergy", amount)
        },

        playCurrentlySelectedCard() {},
        discardCurrentlySelectedCard() {},
        rightClick() {},
    },
    getters: {}
}
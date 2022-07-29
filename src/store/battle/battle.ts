export default {
    state: {
        backgroundUsed: 'forest',
        currentEnergy: 3,
        maxEnergy: 3,
    },
    mutations: {
    },
    actions: {
        clickPlayer() {},
        playCurrentlySelectedCard() {},
        discardCurrentlySelectedCard() {},
        rightClick() {}
    },
    getters: {
        getTurn: state => {
            return state.turnCounter
        },

        getSwitchAllowed: state => {
            return state.switchAllowed
        }
    }
}
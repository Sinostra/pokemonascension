export default {
    state: {
        gameMap: [
            {encounter: 1},
            {encounter: 2},
        ],
        gameMapIndex: 0
    },

    mutations: {
        advanceInMap(state) {
            if(state.gameMapIndex === state.gameMap.length - 1) {
                state.gameMapIndex = 0
            }
            else {
                state.gameMapIndex++
            }
        }
    },

    getters: {
        currentStep: state => {
            return state.gameMap[state.gameMapIndex]
        }
    }
}
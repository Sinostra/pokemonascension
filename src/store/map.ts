import cloneDeep from "lodash.clonedeep"
export default {
    state: {
        gameMap: [],

        baseGameMap: [
            {encounter: 3},
            {encounter: 1},
            {encounter: 4},
            {encounter: 5},
            {event: 1},
            {encounter: 2},
            {encounter: 6},
            {encounter: 7},
            [
                {encounter: 8},
                {encounter: 9},
                {encounter: 10},
            ]
        ],
        gameMapIndex: -1
    },

    mutations: {

        setGameMap(state) {
            const baseMap = cloneDeep(state.baseGameMap)
            state.gameMap = baseMap.map((step) => {
                if(!Array.isArray(step)) {
                    return step
                }

                else {
                    return step.sort(() => {
                        if(Math.random() > 0.5) return -1
                        else return 1
                    })[0]
                }
            })
        },

        advanceInMap(state) {
            if(state.gameMapIndex === state.gameMap.length - 1) {
                const baseMap = cloneDeep(state.baseGameMap)
                state.gameMap = baseMap.map((step) => {
                    if(!Array.isArray(step)) {
                        return step
                    }
    
                    else {
                        return step.sort(() => {
                            if(Math.random() > 0.5) return -1
                            else return 1
                        })[0]
                    }
                })
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
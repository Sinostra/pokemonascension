export default {
    state: {
        foeTeam: [],
    },

    mutations: {
        setFoes(state, foes) {
            state.foeTeam = foes
        },
        setFoeFainted(state, index) {
            if(!state.foeTeam[index]) {
                return
            }
            state.foeTeam[index].fainted = true
        }
    },

    getters: {
        getFoeTeam: state => {
            return state.foeTeam
        },

        getNotFaintedFoes: state => {
            return state.foeTeam.filter((foe) => !foe.fainted)
        }
    }
}
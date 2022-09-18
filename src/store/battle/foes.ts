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

    actions: {
        setFoeFainted(context, index) {
            context.commit("setFoeFainted", index)
        },
        setFoes(context, foes) {
            context.commit("setFoes", foes)
        }
    },

    getters: {
        getFoeTeam: state => {
            return state.foeTeam
        },
    }
}
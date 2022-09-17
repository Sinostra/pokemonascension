export default {
    state: {
        foeTeam: [],
    },

    mutations: {
        setFoes(state, foes) {
            state.foeTeam = foes
        }
    },

    actions: {
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
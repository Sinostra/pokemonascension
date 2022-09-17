export default {
    state: {
        foeTeam: [],
    },

    mutations: {
        setFoes(state, foes) {
            state.foeTeam = foes
            console.log(state.foeTeam)
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
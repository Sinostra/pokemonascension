export default {
    state: {
        backgroundUsed: ''
    },

    mutations: {
        changeBackground(state, background) {
            state.backgroundUsed = background
        }
    },

    actions: {
        changeBackground(context, background) {
            context.commit("changeBackground", background)
        }
    },

    getters: {
        getBackgroundUsed: state => {
            return state.backgroundUsed
        },
    }
}
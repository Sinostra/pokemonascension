export default {
    state: {
        backgroundUsed: ''
    },

    mutations: {
        changeBackground(state, background) {
            state.backgroundUsed = background
        }
    },

    getters: {
        getBackgroundUsed: state => {
            return state.backgroundUsed
        },
    }
}
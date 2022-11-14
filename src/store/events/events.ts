export default {
    state: {
        currentEvent: ""
    },

    mutations: {
        setEvent(state, event) {
            state.currentEvent = event
        },

        removeEvent(state) {
            state.currentEvent = ""
        }
    }
}
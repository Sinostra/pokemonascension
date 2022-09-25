export default {
    state: {
        currentEvent: "starterChoice"
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
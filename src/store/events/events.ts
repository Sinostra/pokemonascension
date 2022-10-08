export default {
    state: {
        currentEvent: "StarterChoice"
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
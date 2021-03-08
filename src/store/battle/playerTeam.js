export default {
    state: {
        team: {
            'active': {
                id: '025',
                pv: 45,
                deck: []
            }
        }
    },

    mutations: {
        changeActivePokemonHealth(state, value) {
            state.team['active']['pv'] = value
        }
    },

    actions: {
        changeActivePokemonHealth(context, value) {
            context.commit('changeActivePokemonHealth', value)
        }
    }
}
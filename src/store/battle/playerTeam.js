export default {
    state: {
        team: {
            'active': {
                id: '025',
                pv: 45,
                deck: [
                    {id: '001'},
                    {id: '005'},
                    {id: '001'},
                    {id: '002'},
                    {id: '003'},
                    {id: '004'},
                    {id: '001'},
                    {id: '002'},
                    {id: '003'},
                    {id: '004'}, 
                ]
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
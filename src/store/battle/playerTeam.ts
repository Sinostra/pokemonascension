export default {
    state: {
        team: {
            '1': {
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
            },

            '2': {
                id: '104',
                pv: 45,
                deck: [
                    {id: '005'},
                    {id: '005'},
                    {id: '005'},
                    {id: '005'},
                    {id: '005'},
                    {id: '005'},
                    {id: '005'},
                    {id: '005'},
                    {id: '005'},
                    {id: '005'}, 
                ]
            }
        },

        activeIndex: '1'
    },

    mutations: {
        changeActivePokemonHealth(state, value) {
            state.team[state.activeIndex]['pv'] = value
        },

        switchActivePokemon(state) {
            if(state.activeIndex == '1') state.activeIndex = '2'
            else state.activeIndex = '1'
        }
    },

    actions: {
        changeActivePokemonHealth(context, value) {
            context.commit('changeActivePokemonHealth', value)
        },

        switchActivePokemon(context) {
            context.commit('switchActivePokemon')
        }
    },

    getters: {
        getActiveIndex: state => {
            return state.activeIndex
        }
    }
}
export default {
    state: {
        team: {
            '1': {
                id: '025',
                deck: [
                    '001',
                    '006',
                    '003',
                    '004',
                    '005',
                ]
            },

            '2': {
                id: '104',
                deck: [
                    '005',
                    '005',
                    '005',
                    '005',
                    '005',
                    '005',
                    '005',
                    '005',
                ]
            }
        },

        activeIndex: '1'
    },

    mutations: {
        switchActivePokemon(state) {
            if(state.activeIndex == '1') state.activeIndex = '2'
            else state.activeIndex = '1'
        }
    },

    actions: {
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
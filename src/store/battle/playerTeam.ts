export default {
    state: {
        team: [],
        activeIndex: 0
    },

    mutations: {
        addPokemon(state, pokemon) {
            state.team.push({id: pokemon.id, deck: pokemon.deck, remainingHp: pokemon.hp})
        },
        switchActivePokemon(state) {
            
        }
    },

    actions: {
        addPokemon(context, pokemon) {
            context.commit('addPokemon', pokemon)
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
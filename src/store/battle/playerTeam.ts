export default {
    state: {
        team: [],
        activeIndex: 0
    },

    mutations: {
        addPokemon(state, pokemon) {
            state.team.push({id: pokemon.id, deck: pokemon.deck, remainingHp: pokemon.hp})
        },
        changeActivePokemonHealth(state, hp) {
            if(!state.team[state.activeIndex]) {
                return
            }
            state.team[state.activeIndex].remainingHp = hp
            if(hp === 0) {
                state.team[state.activeIndex].fainted = true
            }
        },
        switchActivePokemon(state) {
            
        }
    },

    actions: {
        addPokemon(context, pokemon) {
            context.commit('addPokemon', pokemon)
        },
        changeActivePokemonHealth(context, hp) {
            context.commit('changeActivePokemonHealth', hp)
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
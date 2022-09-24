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

    getters: {
        getActiveIndex: state => {
            return state.activeIndex
        }
    }
}
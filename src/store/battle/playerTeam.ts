export default {
    state: {
        team: [],
        activeIndex: 0,
    },

    mutations: {
        addPokemon(state, pokemon) {
            state.team.push({id: pokemon.id, deck: pokemon.deck, remainingHp: pokemon.hp})
        },
        emptyPlayerTeam(state) {
            state.team = []
        },
        changeActivePokemonHealth(state, hp) {
            if(!state.team[state.activeIndex]) {
                return
            }
            state.team[state.activeIndex].remainingHp = hp
        },
        faintActivePokemon(state) {
            if(!state.team[state.activeIndex]) {
                return
            }
            state.team[state.activeIndex].fainted = true
        },
        switchActivePokemon(state) {
            
        }
    },

    getters: {
        getActiveIndex: state => {
            return state.activeIndex
        },

        getNotFaintedPokemon: state => {
            return state.team.filter((pokemon) => !pokemon.fainted)
        }
    }
}
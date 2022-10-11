export default {
    state: {
        team: [
            {
                "id": "001",
                "deck": [
                  "010",
                  "010",
                  "010",
                  "010",
                  "010",
                  "004",
                  "004",
                  "004",
                  "004",
                  "007"
                ],
                "remainingHp": 45
            },
            {
                "id": "004",
                "deck": [
                  "011",
                  "011",
                  "011",
                  "011",
                  "011",
                  "004",
                  "004",
                  "004",
                  "004",
                  "007"
                ],
                "remainingHp": 45
            } 
        ],
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
        getPlayerTeam: state => {
            return state.team
        },

        getActiveIndex: state => {
            return state.activeIndex
        },

        getNotFaintedPokemon: state => {
            return state.team.filter((pokemon) => !pokemon.fainted)
        },
    }
}
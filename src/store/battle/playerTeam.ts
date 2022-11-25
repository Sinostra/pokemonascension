export default {
    state: {
        team: [
            {
                id: "001",
                deck: [],
                remainingHp: 45,
                maxHp: 45,
                fainted: false
            },
            {
                id: "009",
                deck: [],
                remainingHp: 45,
                maxHp: 45,
                fainted: false
            }
        ],
        activeIndex: 0,
    },

    mutations: {
        addPokemon(state, pokemon) {
            state.team.push({id: pokemon.id, deck: pokemon.deck, remainingHp: pokemon.hp, maxHp: pokemon.maxHp, fainted: false})
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
        addCardToPokemon(state, payload) {
            state.team[payload.pokemonIndex]['deck'].push(payload.cardId)
        },
        healAllPlayerPokemon(state) {
            state.team.forEach((pokemon) => {
                pokemon.fainted = false
                pokemon.remainingHp = pokemon.maxHp
            })
        },
        switchActivePokemon(state) {
            
        },
    },

    getters: {
        getPlayerTeam: state => {
            return state.team
        },

        getActiveIndex: state => {
            return state.activeIndex
        },

        getActivePokemon: state => {
            return state.team[state.activeIndex]
        },

        getNotFaintedPokemon: state => {
            return state.team.filter((pokemon) => !pokemon.fainted)
        },
    }
}
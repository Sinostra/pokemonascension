export default {
    state: {
        team: [],
    },

    mutations: {
        addPokemon(state, pokemon) {
            state.team.push({
                id: pokemon.id,
                deck: pokemon.deck,
                remainingHp: pokemon.hp,
                maxHp: pokemon.maxHp,
                fainted: false
            })
        },
        emptyPlayerTeam(state) {
            state.team = []
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
    },

    getters: {

    }
}
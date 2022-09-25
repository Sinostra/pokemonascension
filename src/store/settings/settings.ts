export default {
    state: {
        pokemonSpritesExtension: 'gif',
        backgroundExtension: '.jpg',
        baseFontSize: 16,
    },

    mutations: {
        changeBaseFontSize(state, newSize) {
            state.baseFontSize = newSize
        }
    }
}
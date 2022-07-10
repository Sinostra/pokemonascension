import dataDex from './data-dex';

export default {
    state: {
        constantDex: dataDex
    },

    getters: {
        getDex: state => {
            return state.constantDex
        }
    }
}
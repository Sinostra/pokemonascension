import dataTypes from './data-types';

export default {
    state: {
        dataTypes
    },

    getters: {
        getTypes: state => {
            return state.dataTypes
        }
    }
}
import { createStore } from 'vuex'
import pokedex from './constantData/pokedex/pokedex'
import backgrounds from './constantData/background/background'
import battle from './battle/battle'
import settings from './settings/settings'

export default createStore({
  state: {
    baseFontSize: 16
  },

  mutations: {
    changebaseFontSize(state, value) {
      state.baseFontSize = value
    },
  },

  actions: {
    changebaseFontSize(context, value) {
      context.commit('changebaseFontSize', value)
    },
  },

  modules: {
    pokedex,
    backgrounds,
    battle,
    settings
  }
})

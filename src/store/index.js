import { createStore } from 'vuex'
import pokedex from './constantData/pokedex/pokedex'
import backgrounds from './constantData/background/background'
import battle from './battle/battle'
import settings from './settings/settings'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    pokedex,
    backgrounds,
    battle,
    settings
  }
})

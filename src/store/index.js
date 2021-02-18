import { createStore } from 'vuex'
import pokedex from './constantData/pokedex/pokedex'
import battle from './battle/battle'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    pokedex,
    battle
  }
})

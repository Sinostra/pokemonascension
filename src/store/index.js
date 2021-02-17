import { createStore } from 'vuex'
import pokedex from './constantData/pokedex/pokedex'
import fight from './fight/fight'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    pokedex,
    fight
  }
})

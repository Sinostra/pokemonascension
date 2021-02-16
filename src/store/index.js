import { createStore } from 'vuex'
import datadex from './constantData/datadex'

export default createStore({
  state: {
    constantDex: datadex
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    datadex
  }
})

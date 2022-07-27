import { createStore } from 'vuex'
import pokedex from './constantData/pokedex/pokedex'
import types from './constantData/types/types'
import backgrounds from './constantData/background/background'
import cards from './constantData/cards/cards'
import battle from './battle/battle'
import playerTeam from './battle/playerTeam'
import board from './battle/board'
import foes from './battle/foes'
import settings from './settings/settings'

export default createStore({
  state: {
    baseFontSize: 16,
    mousePosition: {
      x: 0,
      y: 0
    }
  },

  mutations: {
    changebaseFontSize(state, value) {
      state.baseFontSize = value
    },
    updateMousePositionX(state, value) {
      state.mousePosition['x'] = value
    },
    updateMousePositionY(state, value) {
      state.mousePosition['y'] = value
    },
  },

  actions: {
    changebaseFontSize(context, value) {
      context.commit('changebaseFontSize', value)
    },
    updateMousePositionX(context, value) {
      context.commit('updateMousePositionX', value)
    },
    updateMousePositionY(context, value) {
      context.commit('updateMousePositionY', value)
    },
  },

  modules: {
    pokedex,
    backgrounds,
    battle,
    playerTeam,
    foes,
    board,
    settings,
    cards,
    types
  }
})

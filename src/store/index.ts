import { createStore } from 'vuex'
import pokedex from './constantData/pokedex/pokedex'
import types from './constantData/types/types'
import backgrounds from './constantData/background/background'
import cards from './constantData/cards/cards'
import battle from './battle/battle'
import events from './events/events'
import playerTeam from './battle/playerTeam'
import foes from './battle/foes'
import settings from './settings/settings'
import allFoes from './constantData/foes/allFoes'
import app from './app/app'
import cloneDeep from "lodash.clonedeep"

export default createStore({
  state: {},

  actions: {

    goToNextBattle(context, state) {
      console.log(state)
      // context.commit("setFoes", [])
      // context.commit("stopDisplayBattleRewards")
      // context.commit("setFoes", cloneDeep(state.state.allFoes.dataFoes[1]))
      // context.commit("changeBackground", 'forest')
      // context.commit("startBattle")
    },

    resetGame(context) {
      context.commit("emptyPlayerTeam")
      context.commit("setFoes", [])
      context.commit("stopBattle")
      context.commit("resetPlayerStatus")
      context.commit("stopDisplayBattleRewards")
      context.commit("changeBackground", 'starter_background')
      context.commit("setEvent", 'StarterChoice')
    }
  },
  
  modules: {
    pokedex,
    backgrounds,
    battle,
    events,
    playerTeam,
    foes,
    settings,
    cards,
    types,
    allFoes,
    app
  }
})

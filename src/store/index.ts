import { createStore } from 'vuex'
import pokedex from './constantData/pokedex/pokedex'
import backgrounds from './constantData/background/background'
import cards from './constantData/cards/cards'
import battle from './battle/battle'
import events from './events/events'
import playerTeam from './battle/playerTeam'
import foes from './battle/foes'
import settings from './settings/settings'
import allFoes from './constantData/foes/allFoes'
import app from './app/app'

export default createStore({
  state: {},

  actions: {

    goToNextBattle(context, foes) {
      context.commit("setFoes", [])
      context.commit("stopDisplayBattleRewards")
      context.commit("setFoes", foes)
      context.commit("changeBackground", 'forest')
      context.commit("startBattle")
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
    allFoes,
    app
  }
})

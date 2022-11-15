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
import encounters from './constantData/encounters'
import event from './constantData/events'
import map from './map'
import app from './app/app'

export default createStore({
  state: {},

  actions: {

    playevent(context, id) {
      const foundEvent = event.find((e) => e.id === id)
      if(!foundEvent) {
        return
      }
      context.commit("stopBattleDisplay")
      context.commit("changeBackground", foundEvent.background)
      context.commit("setEvent", foundEvent.name)
    },

    playencounter(context, id) {
      const encounter = encounters.find((e) => e.id === id)
      if(!encounter) {
        return
      }
      context.commit("changeBackground", encounter.background)
      context.commit("setFoes", encounter.foes)
      context.commit("startBattle")
    },

    playNextStep(context) {
      context.commit("advanceInMap")
      // const entries = Object.entries(context.getters.currentStep)
      // const actionName = "play"+entries[0]
      // context.dispatch(actionName, entries[1])

      if(!!context.getters.currentStep['encounter']) {
        context.dispatch("playencounter", context.getters.currentStep['encounter'])
      }
      else {
        context.dispatch("playevent", context.getters.currentStep['event'])
      }
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
    map,
    app
  }
})

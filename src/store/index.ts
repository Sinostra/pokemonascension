import { createStore } from 'vuex'
import pokedex from './constantData/pokedex/pokedex'
import battle from './battle/battle'
import events from './events/events'
import playerTeam from './battle/playerTeam'
import foes from './battle/foes'
import settings from './settings/settings'
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
    battle,
    events,
    playerTeam,
    foes,
    settings,
    map,
    app
  }
})

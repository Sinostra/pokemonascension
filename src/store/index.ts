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
import app from './app/app'

export default createStore({
  state: {},

  actions: {

    playEvent(context, id) {
      const foundEvent = event.find((e) => e.id === id)
      if(!foundEvent) {
        return
      }
      context.commit("stopBattleDisplay")
      context.commit("changeBackground", foundEvent.background)
      context.commit("setEvent", foundEvent.name)
    },

    playEncounter(context, id) {
      const encounter = encounters.find((e) => e.id === id)
      if(!encounter) {
        return
      }
      context.commit("changeBackground", encounter.background)
      context.commit("setFoes", encounter.foes)
      context.commit("startBattle")
    },
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

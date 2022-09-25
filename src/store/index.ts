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

export default createStore({
  state: {},
  
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

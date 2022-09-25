import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    pokedex: any,
    backgrounds: any,
    battle: any,
    events: any,
    playerTeam: any,
    foes: any,
    settings: any,
    cards: any,
    types: any,
    allFoes: any,
    app: any
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
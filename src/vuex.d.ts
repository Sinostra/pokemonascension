import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    pokedex: any,
    backgrounds: any,
    battle: any,
    playerTeam: any,
    foes: any,
    board: any,
    settings: any,
    cards: any,
    types: any
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
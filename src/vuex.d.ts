import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    // battle: any,
    battle: any,
    events: any,
    playerTeam: any,
    // foes: any,
    settings: any,
    types: any,
    map: any,
    app: any
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
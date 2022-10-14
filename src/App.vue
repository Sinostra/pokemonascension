<template>
  <div class="global-wrapper"
  :class="appClass"
  @click.right.prevent="onRightClick()">
    <Background/>
    <GameInterface/>
    <EventsManager v-if="$store.state.events.currentEvent"/>
    <BattleManager v-if="$store.state.battle.isBattleOngoing && !$store.state.battle.playerLost"/>
    <AfterBattleModal v-if="$store.state.battle.displayBattleRewards || $store.state.battle.playerLost"></AfterBattleModal>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Background from './components/background/Background.vue'
import BattleManager from './components/battlemanager/BattleManager.vue'
import EventsManager from './components/events/EventsManager.vue'
import GameInterface from './components/interface/GameInterface.vue'
import AfterBattleModal from './components/interface/AfterBattleModal.vue'
import { inject } from 'vue'
import { EffectContainer } from "./engine/EffectContainer"

@Options({
    name: "App",
    components: {
        Background,
        BattleManager,
        EventsManager,
        GameInterface,
        AfterBattleModal
    }
})

export default class App extends Vue {
  public appClass = "width-mesure"
  private emitter: any = inject('emitter')

  public onResize() {
    if(window.innerWidth > 1.8 * window.innerHeight) this.appClass = 'height-mesure'
    else this.appClass = 'width-mesure'
    this.$store.commit("changeBaseFontSize", Math.round(window.innerWidth / 100))
  }

  public onRightClick() {
    this.emitter.emit("rightClick")
  }

  public onMouseMove(event) {
    this.$store.commit("updateMouseCoordinates", {x: event.x, y: event.y})
  }

  public mounted() {

    const multiAttack = new EffectContainer['MultiAttackEffect']({damageTimes: 5})
    multiAttack.playEffect()
    // console.log(multiAttack)

    // const effect = 'AttackEffect'

    // let attack = new EffectContainer[effect]({
    //   user: 'player',
    //   target: 0,
    //   damageAmount: 6,
    //   damageType: 'grass',
    //   ignoreBlock: false,
    // })

    // let attack = new EffectContainer['AttackEffect']()
    // let block = new EffectContainer['BlockEfffect']()

    // let multi = new EffectContainer['MultiEffect']([attack, block])

    // multi.playEffect()

    // console.log(multi)

    // attack.playEffect()
    // block.playEffect()

    window.addEventListener("resize", this.onResize);
    window.addEventListener("mousemove", this.onMouseMove)
    window.dispatchEvent(new Event('resize'));
    this.$store.commit("changeBackground", 'starter_background')
  }

  public beforeUnmount() {
    window.removeEventListener("resize", this.onResize)
    window.removeEventListener("mousemove", this.onMouseMove)
  }
}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,600;0,700;0,800;1,600;1,700;1,800&display=swap');
@font-face {
  font-family: 'gill extra bold';
  src: url("./assets/fonts/Gill_Sans_MT_Extra_Bold.ttf");
}
@font-face {
  font-family: 'gill sans';
  src: url("./assets/fonts/Gill_Sans.ttf");
}
@font-face {
  font-family: 'gill sans bold';
  src: url("./assets/fonts/Gill_Sans_Bold.TTF");
}
@font-face {
  font-family: 'futura condensed';
  src: url("./assets/fonts/Futura_LT_Condensed_Medium.ttf");
}
// @font-face {
//   font-family: 'futura';
//   src: url("./assets/fonts/Futura LT Condensed Extra Bold.ttf");
// }
@font-face {
  font-family: 'futura';
  src: url("./assets/fonts/Futura_LT_Bold.ttf");
}
@font-face {
  font-family: 'ERASDEMI';
  src: url("./assets/fonts/ERASDEMI.ttf");
}
@font-face {
  font-family: 'ERASBD';
  src: url("./assets/fonts/ERASBD.ttf");
}

* {
  box-sizing: border-box;
  user-select: none;
}

body {
  margin: 0;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background: black;
}

#app {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.global-wrapper {
  
  position: relative;

  .text {
    font-family: "Open Sans", sans-serif;
  }

  &.width-mesure {
    width: 100vw;
    min-width: 100vw;
    max-width: 100vw;
    height: calc(100vw / (16 / 9));
    min-height: calc(100vw / (16 / 9));
    max-height: calc(100vw / (16 / 9));
  }

  &.height-mesure {
    height: 100vh;
    min-height: 100vh;
    max-height: 100vh;
    flex: 1;
    max-width: calc(100vh * (16 / 9));
  }
}

.btn {
  margin: 50px 0;
  padding: 20px;
  background: black;
  color: #fff;
  cursor: pointer;
  z-index: 200;
  max-width: 300px;
  position: relative;
}
</style>
<template>
  <div class="global-wrapper" :class="getAppClass()">
    <Background/>
    <Interface/>
    <BattleManager/>
  </div>
</template>

<script>
import { useWindowSize } from 'vue-window-size';
import Background from './components/Background.vue'
import BattleManager from './components/BattleManager.vue'
import Interface from './components/Interface.vue'
export default {
  name: 'App',
  components: {
    Background,
    BattleManager,
    Interface
  },

  data:function(){
    return {
      wrapperWidth: null,
    }
  },

  methods: {
    getAppClass: function(){
      if(this.windowWidth > 1.8 * this.windowHeight) return 'height-mesure'
      else return 'width-mesure'
    },

    setBaseFontSize: function() {
      this.$store.dispatch('changebaseFontSize', document.querySelector('.global-wrapper').offsetWidth / 100)
    },

    updateMouseCoordinates(event) {
      this.$store.dispatch('updateMousePositionX', event['x'])
      this.$store.dispatch('updateMousePositionY', event['y'])
    }
  },

  setup() {
    const { width, height } = useWindowSize();
    return {
      windowWidth: width,
      windowHeight: height,
    };
  },

  mounted:function() {
    window.addEventListener("resize", this.setBaseFontSize);
    window.dispatchEvent(new Event('resize'));
  }

}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,600;0,700;0,800;1,600;1,700;1,800&display=swap');
@font-face {
  font-family: 'gill sans bold';
  src: url("./assets/fonts/Gill_Sans_MT_Extra_Bold.ttf");
}
@font-face {
  font-family: 'gill sans';
  src: url("./assets/fonts/Gill_Sans.ttf");
}
@font-face {
  font-family: 'futura condensed';
  src: url("./assets/fonts/Futura_LT_Condensed_Medium.ttf");
}
@font-face {
  font-family: 'futura';
  src: url("./assets/fonts/Futura LT Condensed Extra Bold.ttf");
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
}
</style>

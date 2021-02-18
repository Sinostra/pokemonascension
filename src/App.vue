<template>
  <Background/>
  <Interface/>
  <BattleManager/>
</template>

<script>
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
    }
  },

  methods: {
  }
}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,600;0,700;0,800;1,600;1,700;1,800&display=swap');

body {
  margin: 0;
}

#app {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: flex-end;
}
</style>

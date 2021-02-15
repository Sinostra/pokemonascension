<template>
  <div class="app-wrapper" :style="{'background-image':'url(' + getBackgroundUrl() + ')'}">
    <Interface/>
    <Battle/>
  </div>
</template>

<script>
import Battle from './components/Battle.vue'
import Interface from './components//interface/Interface.vue'
export default {
  name: 'App',
  components: {
    Battle,
    Interface
  },

  data:function(){
    return {
      background: 'plaine'
    }
  },

  methods: {
    getBackgroundUrl: function(){
      return require('./assets/img/backgrounds/' + this.background + '.png')
    }
  }
}
</script>

<style lang="scss">

body {
  margin: 0;
}

.app-wrapper {
  height: 100vh;
  display: flex;
  align-items: flex-end;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>

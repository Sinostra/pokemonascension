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
      background: 'forest'
    }
  },

  methods: {
    getBackgroundUrl: function(){
      return require('./assets/img/backgrounds/' + this.background + '.jpg')
    }
  }
}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,600;0,700;0,800;1,600;1,700;1,800&display=swap');

body {
  margin: 0;
}

.app-wrapper {
  height: 100vh;
  display: flex;
  align-items: flex-end;
  background-size: 100%;
  background-position: bottom;
}
</style>

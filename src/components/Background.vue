<template>
    <div class="background-wrapper" :style="{'background-image':'url(' + getBackgroundUrl() + ')'}"></div>
</template>

<script>
export default {
    name: 'Background',

    data: function(){
        return {
        }
    },

    methods: {
        getBackgroundUrl: function(){
            return require('./../assets/img/backgrounds/' + this.$store.state.battle.backgroundUsed + this.$store.state.settings.backgroundExtension)
        }
    }
}
</script>

<style lang='scss' scoped>
.background-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -1;
    background-size: 100%;
    background-position: bottom;
    background-repeat: no-repeat;
}
</style>
<template>
<div class="game-interface" :style="{'background-image':'url(' + getBackground() + ')'}">
    
</div>
</template>

<script>
export default {
    name: 'GameInterface',

    data: function() {
        return {

        }
    },

    methods: {
        getBackground() {
            return require('./../../assets/img/interface/top_border.jpg')
        },
    }
} 
</script>
<style lang="scss" scoped>
.game-interface {
    width: 100%;
    height: 50px;
    background-position: bottom;
}
</style>
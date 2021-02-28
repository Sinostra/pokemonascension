<template>
    <div class="card">
        <div class="cost" :style="(getFontSize())">{{$store.state.cards.dataCards[id]['cost']}}</div>
        <div class="name" :style="(getFontSize(0.6))">{{$store.state.cards.dataCards[id]['name']}}</div>
        <div class="type" :style="(getFontSize(0.6))">{{$store.state.cards.dataCards[id]['type']}}</div>
        <div class="tooltip" :style="(getFontSize(0.8))">{{$store.state.cards.dataCards[id]['tooltip']}}</div>
    </div>
</template>

<script>
export default {
    name: 'Card',

    data: function(){
        return {

        }
    },

    props:['id'],

    methods: {
        getFontSize(multiplier = 1) {
            return 'font-size: ' + (this.$store.state.baseFontSize) * multiplier + 'px;'
        },

    },

    mounted() {
    },
}

</script>
<style lang='scss' scoped>
.card {
    width: 10.2%;
    height: 100%;
    background-color: #182552;
    background-image: url("../../../assets/img/cards/Bord_R2.png");
    background-size: 100% 101%;
    background-position: bottom;
    color: #fff;
    border-radius: 10px;
    border: 2px solid #000;
    position: absolute;
    cursor: pointer;

    .cost {
        position: absolute;
        width: 16%;
        height: 11%;
        left: 1%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'gill sans bold';
    }

    .name {
        position: absolute;
        top: 6.5%;
        left: 17.5%;
        color: black;
        font-family: 'futura';
        text-transform: capitalize;
    }

    .type {
        position: absolute;
        width: 21%;
        height: 5%;
        top: 6.7%;
        right: 11%;
        font-family: 'futura condensed';
        color: #fff;
        text-transform: uppercase;
        display: flex;
        justify-content: center;
        align-items: center;

        /* Font size du texte doit être en fonction de la longueur de son conteneur, ici, type */
    }

    .tooltip {
        position: absolute;
        top: 59%;
        left: 10%;
        width: 83%;
        height: 36%;
        padding: 1%;
        font-family: 'gill sans';
        color: #000;
    }
}
</style>
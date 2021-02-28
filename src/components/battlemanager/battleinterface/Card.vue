<template>
    <div class="card" :style="{'background-image':'url(' + getBackground() + ')'}" :class="$store.state.cards.dataCards[id]['type']">
        <div class="cost" :style="(getFontSize())">{{$store.state.cards.dataCards[id]['cost']}}</div>
        <div class="name" :style="(getFontSize(0.6))">{{$store.state.cards.dataCards[id]['name']}}</div>
        <div class="type" :style="(getFontSize(0.6))">{{$store.state.cards.dataCards[id]['type']}}</div>
        <div class="category" :style="(getCategoryStyle(0.6))">{{$store.state.cards.dataCards[id]['category']}}</div>
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

        getBackground() {
            var card = this.$store.state.cards.dataCards[this.id]
            return require('../../../assets/img/cards/bord_' + card['rarity'] + '.png')
        },

        getCategoryBackground() {
            var card = this.$store.state.cards.dataCards[this.id]
            return require('../../../assets/img/cards/' + card['category'] + '_' + card['rarity'] + '.png')
        },

        getFontSize(multiplier = 1) {
            return 'font-size: ' + (this.$store.state.baseFontSize) * multiplier + 'px;'
        },

        getCategoryStyle(multiplier = 1) {
            var fontSize = 'font-size: ' + (this.$store.state.baseFontSize) * multiplier + 'px;'
            var background = 'background-image :url(' + this.getCategoryBackground() + ');'
            return fontSize + background
        }

    },

    mounted() {
    },
}

</script>
<style lang='scss' scoped>
.card {
    width: 10.2%;
    height: 100%;
    background-size: 100% 101%;
    background-position: bottom;
    color: #fff;
    border-radius: 10px;
    position: absolute;
    cursor: pointer;

    &.normal {
        background-color: #909aa0;
    }

    &.electric {
        background-color: #f4d23c;
    }

    &.psychic {
        background-color: #fa7179;
    }

    &.normal {
        background-color: #909aa0;
    }

    &.normal {
        background-color: #909aa0;
    }

    &.normal {
        background-color: #909aa0;
    }

    &.normal {
        background-color: #909aa0;
    }

    &.normal {
        background-color: #909aa0;
    }

    &.normal {
        background-color: #909aa0;
    }

    &.normal {
        background-color: #909aa0;
    }

    &.normal {
        background-color: #909aa0;
    }

    &.normal {
        background-color: #909aa0;
    }

    &.normal {
        background-color: #909aa0;
    }

    &.normal {
        background-color: #909aa0;
    }

    &.normal {
        background-color: #909aa0;
    }

    &.normal {
        background-color: #909aa0;
    }

    &.normal {
        background-color: #909aa0;
    }

    &.normal {
        background-color: #909aa0;
    }

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
    }

    .category {
        position: absolute;
        width: 40%;
        height: 5%;
        top: 49%;
        left: 30%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        color: #000;
        text-align: center;
        text-transform: capitalize;
        font-family: 'futura';
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
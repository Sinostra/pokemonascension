<template>
    <div class="card" :class="$store.state.cards.dataCards[id]['type']" :style="{'background-image':'url(' + getBackground() + ')'}">

        <div
            class="cost"
            :style="(getFontSize())">
            <img :src="getCostBackground()">
            {{$store.state.cards.dataCards[id]['cost']}}
        </div>

        <div class="name" :style="(getFontSize(0.6))">{{$store.state.cards.dataCards[id]['name']}}</div>
        <div class="type" :style="(getFontSize(0.6))">{{$store.state.cards.dataCards[id]['type']}}</div>

        <div class="illustration" :style="{'background-image':'url(' + getIllustrationBackground() + ')'}"></div>

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
            return require('../../../assets/img/cards/bords/' + card['rarity'] + '.png')
        },

        getFontSize(multiplier = 1) {
            return 'font-size: ' + (this.$store.state.baseFontSize) * multiplier + 'px;'
        },


        getCostBackground() {
            var card = this.$store.state.cards.dataCards[this.id]
            return require('../../../assets/img/cards/bords/' + card['rarity'] + '_round.png')
        },

        getIllustrationBackground() {
            return require('../../../assets/img/cards/illustrations/' + this.id + '.jpg')
        },

        getCategoryBackground() {
            var card = this.$store.state.cards.dataCards[this.id]
            return require('../../../assets/img/cards/' + card['category'] + '_' + card['rarity'] + '.png')
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
    height: 89%;
    background-size: contain;
    background-position: top;
    background-repeat: no-repeat;
    color: #fff;
    border-radius: 10px;
    position: absolute;
    cursor: pointer;
    z-index: 1;

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
        top: -2%;
        left: -2%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'gill sans bold';

        img {
            display: block;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
        }
    }

    .name {
        position: absolute;
        top: 5%;
        left: 14.5%;
        color: black;
        font-family: 'futura';
        text-transform: capitalize;
    }

    .type {
        position: absolute;
        width: 21%;
        height: 5%;
        top: 5.5%;
        right: 11%;
        font-family: 'futura condensed';
        color: #fff;
        text-transform: uppercase;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .illustration {
        position: absolute;
        top: 13.5%;
        left: 10%;
        width: 80%;
        height: 37%;
        border-radius: 1px;
        background-size: contain;
    }

    .category {
        position: absolute;
        width: 40%;
        height: 5%;
        top: 48%;
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
        left: 7%;
        width: 86%;
        height: 36%;
        padding: 2%;
        font-family: 'gill sans';
        color: #000;
    }
}
</style>
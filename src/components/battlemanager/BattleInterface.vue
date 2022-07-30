<template>
<div class="battle-interface">
    <!-- <div class="top-wrapper">
        <div class="btn" @click="clickSwitch()">Switch</div>
    </div> -->
    <div class="bottom-wrapper">
        <div class="energy-wrapper text" :style="getFontSize()">{{$store.state.battle.currentEnergy}}/{{$store.state.battle.maxEnergy}}</div>
        <div class="drawPile" :style="getFontSize()">
            <div class="number text">{{$store.state.board.drawPile.length}}</div>
        </div>
        <Hand></Hand>
        <PlayCardModal v-if="$store.state.board.selectedCard !== null"></PlayCardModal>
        <DiscardManager></DiscardManager>
        <div class="discardPile" :style="getFontSize()">
            <div class="number text">{{$store.state.board.discardPile.length}}</div>
        </div>
        <div class="end-turn-btn text" :style="getFontSize()" @click="endTurn()">
            End Turn
        </div>
    </div>
</div>
</template>

<script>
import Hand from '../interface/Hand.vue'
import PlayCardModal from '../interface/PlayCardModal.vue'
import DiscardManager from '../interface/DiscardManager.vue'
export default {
    name: 'BattleInterface',

    components: {
        Hand,
        PlayCardModal,
        DiscardManager
    },


    data: function() {
        return {
           
        }
    },

    methods: {

        getFontSize(multiplier = 1) {
            return 'font-size: ' + (this.$store.state.baseFontSize) * multiplier + 'px;'
        },


        endTurn() {
            
        }

    },

} 
</script>

<style lang="scss" scoped>
.battle-interface {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .top-wrapper {
        height: 6%;
        position: relative;
    }

    .bottom-wrapper {
        flex: 1;
        position: relative;
        overflow: hidden;
    }
}

.energy-wrapper {
    position: absolute;
    left: 5%;
    bottom: 20%;
    width: 5.023%;
    height: 9.5%;
    color: #fff;
    background: #182552;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.player-hand {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 100%;
    height: 30%;
    z-index: 4;
    bottom: -6%;
}

.drawPile, .discardPile {
    position: absolute;
    bottom: 0%;
    z-index: 5;
    cursor: pointer;
    width: 6%;
    height: 9%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    .number {
        position: absolute;
        width: 20%;
        height: 40%;
        top: 22%;
        display: flex;
        color: #fff;
        justify-content: center;
        align-items: center;
    }
}

.drawPile {
    left: 1%;
    background-image: url('../../assets/img/interface/pioche.png');
    .number {
        right: 5%;
    }
}

.discardPile {
    right: 1%;
    background-image: url('../../assets/img/interface/defausse.png');
    .number {
        left: 3%;
    }
}

.end-turn-btn {
    position: absolute;
    right: 3%;
    bottom: 15%;
    background: #182552;
    color: #fff;
    padding: 0.2% 2%;
    z-index: 5;
    text-transform: uppercase;
    cursor: pointer;
    border: 2px #fff solid;
    border-radius: 5px;
}

</style>
<template>
<div class="battle-interface">
    <div class="top-wrapper"></div>
    <div class="bottom-wrapper">
        <div class="player-hand">
            <div v-on:click="removeCard(index)" :style="displayCardsInHand(index)" v-for="(card, index) in playerHand" :key="index" class="card">{{index}}</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'BattleInterface',

    data: function() {
        return {
            playerHand: ['001', '002', '003', '003', '002', '001', '001', '001'],
        }
    },

    methods: {
        displayCardsInHand(index){
            var baseRotate = 5
            var baseLeft = 40
            var leftShift = 2
            var handSize = this.playerHand.length
            var lastIndexToRotate = (Math.floor(handSize / 2)) - 1

            var difference = lastIndexToRotate - index;
            var finalRotate = baseRotate + (baseRotate * difference)

            if(handSize % 2 == 0 && index > lastIndexToRotate) {
                finalRotate -= baseRotate
            }

            finalRotate *= -1
            var finalLeft = baseLeft + index * leftShift

            console.log(finalRotate)
            return 'transform : rotate(' + finalRotate + 'deg); left : ' + finalLeft + '%;'

        },

        removeCard(index) {
            this.playerHand.splice(index, 1)
        }
    },

    mounted: function() {
        
    }
} 
</script>

<style lang="scss" scoped>
.battle-interface {
    flex: 1;
    display: flex;
    flex-direction: column;

    .top-wrapper {
        flex: 1;
    }
}
.player-hand {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 0;
    width: 100%;
    padding-top: 30px;
    height: 30vh;
    overflow: hidden;
    .card {
        width: 130px;
        height: 200px;
        background: #182552;
        color: #fff;
        border-radius: 10px;
        border: 2px solid #000;
        bottom: -80px;
        left: 50%;
        transform: translate(-50%);
        position: absolute;
        cursor: pointer;
    }
}
</style>
<template>
<div class="battle-interface">
    <!-- <div class="btn" @click="drawCards(1)">click here to draw 1</div> -->
    <div class="top-wrapper"></div>
    <div class="bottom-wrapper">
        <div class="drawPile">
            <div class="number text">{{drawPile.length}}</div>
        </div>
        <div class="player-hand">
            <Card v-for="(card, index) in playerHand" :key="index" :style="displayCardsInHand(index)" :id="card.id" :class="card.selected ? 'selected' : ''" v-on:click="selectCard(index)"/>
        </div>
        <div class="discardPile">
            <div class="number text">{{discardPile.length}}</div>
        </div>
        <div class="end-turn-btn text">
            End Turn
        </div>
    </div>
</div>
</template>

<script>
import Card from './battleinterface/Card.vue'
export default {
    name: 'BattleInterface',

    components: {
        Card,
        selectedCard: null
    },

    props: ['detectedCardPlayed', 'cardUnselected'],

    watch: {
        detectedCardPlayed: function(newVal) {
            if(newVal) {
                this.removeCard(this.selectedCard)
                this.$emit('cardDiscarded')
                this.$store.dispatch('changeCardSelection', null)
            }
        },

        cardUnselected: function(newVal) {
            if(newVal == null) {
                for(var i = 0; i < this.playerHand.length; i++) {
                    this.playerHand[i].selected = false
                }
            }
        }

    },

    data: function() {
        return {
            drawPile: [
                {id: '001', selected: false},
                {id: '001', selected: false},
                {id: '001', selected: false},
                {id: '001', selected: false},
                {id: '001', selected: false},
                {id: '001', selected: false},
                {id: '001', selected: false},
                {id: '001', selected: false},
                {id: '001', selected: false},
                {id: '001', selected: false},
                {id: '001', selected: false},
                {id: '001', selected: false},
                {id: '001', selected: false},
                {id: '001', selected: false},
            ],
            selectedCard: null,
            playerHand: [
                {id: '001', selected: false},
                {id: '001', selected: false},
                {id: '001', selected: false},
                {id: '001', selected: false},
                {id: '001', selected: false},
                {id: '001', selected: false},
                {id: '001', selected: false},
                {id: '001', selected: false},
                {id: '001', selected: false},
                {id: '001', selected: false},
            ],
            discardPile: [],
            maxHandSize: 10
        }
    },

    methods: {
        displayCardsInHand(index){
            var handSize = this.playerHand.length
            var evenHand = handSize % 2 == 0

            //Une rotation de carte
            var baseRotate =  5

            //L'endroit où la carte du milieu se positionne
            var baseBottom = -3
            // var baseBottom = 0

            //L'endroit où la première carte se positionne
            var baseLeft = 45 - (handSize * 1.5)

            //L'écart horizontal entre deux cartes
            var leftShift = 4

            //Détermine le milieu
            var lastIndexToRotate = (Math.floor(handSize / 2))
            
            //Décale le mileu dans une main paire
            if(evenHand) lastIndexToRotate -= 1

            //Où on est par rapport à la main entière
            var difference = lastIndexToRotate - index;

            //Sert à mettre en place une symétrie entre les différences en cas de main paire : (2,1,0,0,-1,-2) au lieu de (2,1,0,-1,-2,-3)
            if(evenHand && difference < 0) {
                difference += 1
            }

            //Rotation finale calculée en fonction de la différence (donc la position par rapport à la carte du milieu, plus on en est loin, plus la rotation sera importante)
            var finalRotate = baseRotate * difference

            //Permet de ne pas avoir de rotation à 0 dans une main paire
            if(evenHand) {
                if(index <= lastIndexToRotate) finalRotate += baseRotate
                else finalRotate -= baseRotate
            }

            finalRotate *= -1

            //L'écart vertical entre deux cartes
            var bottomShift = 1.5 * Math.abs(difference)

            var finalBottom = baseBottom - (bottomShift * Math.abs(difference))

            //On ajoute une rotation à toutes les cartes après celle du milieu quand le nombre de cartes en main est pair, pour ne pas avoir de carte avec une rotation à 0
            if(handSize % 2 == 0 && index > lastIndexToRotate) {
                // finalRotate -= baseRotate
            }

            // finalRotate *= -1
            var finalLeft = baseLeft + index * leftShift
            
            return 'transform : rotate(' + finalRotate + 'deg); left : ' + finalLeft + '%; bottom: ' + finalBottom + '%;' 

        },

        selectCard(clickedIndex) {
            this.$store.dispatch('changeCardSelection', this.playerHand[clickedIndex]['id'])
            this.selectedCard = clickedIndex
            for(var i = 0; i < this.playerHand.length; i++) {
                this.playerHand[i].selected = i == clickedIndex
            }
        },

        drawCards(amount) {
            for(var i = 0; i < amount; i++) {

                if(this.drawPile.length == 0) {
                    this.drawPile = this.discardPile.splice(0, this.discardPile.length)
                }

                
                if (this.playerHand.length < this.maxHandSize) {
                    this.playerHand.push(this.drawPile.shift())
                }

                else this.discard(this.drawPile.shift())
            }
            
        },

        discard(card) {
            this.discardPile.push(card)
        },

        removeCard(index) {
            this.playerHand[index]['selected'] = false
            this.discard(this.playerHand.splice(index, 1)[0])
        }
    },

    mounted: function() {

    }
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
    }
}
.player-hand {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 100%;
    height: 30%;
    z-index: 1;
    bottom: -3%;
}

.drawPile, .discardPile {
    position: absolute;
    bottom: 2%;
    z-index: 2;
    cursor: pointer;
    width: 10%;
    height: 9%;
    background-size: cover;
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
    left: 5%;
    background-image: url('../../assets/img/interface/pioche.png');
    .number {
        right: 5%;
    }
}

.discardPile {
    right: 5%;
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
    z-index: 2;
    text-transform: uppercase;
    cursor: pointer;
    border: 2px #fff solid;
    border-radius: 5px;
}
</style>
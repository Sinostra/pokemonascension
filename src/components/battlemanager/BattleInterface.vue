<template>
<div class="battle-interface">
    <!-- <div class="btn" @click="drawCards(1)">click here to draw 1</div> -->
    <div class="top-wrapper"></div>
    <div class="bottom-wrapper">
        <div class="energy-wrapper text" :style="getFontSize()">{{$store.state.battle.currentEnergy}}/{{$store.state.battle.maxEnergy}}</div>
        <div class="drawPile" :style="getFontSize()">
            <div class="number text">{{drawPile.length}}</div>
        </div>
        <div class="player-hand" :style="getFontSize()">
            <Card v-for="(card, index) in playerHand" :key="index" :style="displayCardsInHand(index)" :id="card.id" :class="getCardClass(index)" v-on:click="selectCard(index)"/>
        </div>
        <div class="discardPile" :style="getFontSize()">
            <div class="number text">{{discardPile.length}}</div>
        </div>
        <div class="end-turn-btn text" :style="getFontSize()">
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
    },

    props: ['cardClickedInterface', 'cardClickedPokemon'],


    //Tous les events relatifs aux cartes (jeu, désélection) devraient passer par le store battle et être écoutés par le BattleManager pour toujours arriver vers BattleInterface
    //Actuellement, il y a Interface, Pokémon et BattleManager qui interagissent avec les cartes
    watch: {
        cardClickedInterface: function(newVal) {
            if(newVal) {
                console.log('card played on interface')
                this.$store.dispatch('changeinterfaceClicked', false)
                // this.discard(this.playerHand.splice(this.selectedCard, 1)[0])
                // this.$store.dispatch('changeCardSelection', null)
            }
        },

        cardClickedPokemon: function(newVal) {
            if(newVal) {
                console.log('card played on pokemon')
                this.$store.dispatch('changepokemonClicked', false)
                // this.discard(this.playerHand.splice(this.selectedCard, 1)[0])
                // this.$store.dispatch('changeCardSelection', null)
            }
        }
    },

    data: function() {
        return {
            drawPile: [],
            
            playerHand: [
                {id: '001'},
                {id: '002'},
                {id: '003'},
                {id: '004'},
                {id: '005'},
                {id: '006'},
                {id: '007'},
                {id: '008'},
                {id: '009'},
                {id: '010'},
            ],
            discardPile: [],
            selectedCard: null,
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
            
            // if(this.selectedCard && this.selectedCard == index) return 'transform : rotate(0deg); left : ' + finalLeft + '%; bottom: ' + finalBottom + '%;'
            // else return 'transform : rotate(' + finalRotate + 'deg); left : ' + finalLeft + '%; bottom: ' + finalBottom + '%;'

        },

        selectCard(clickedIndex) {
            this.$store.dispatch('changeCardSelection', this.playerHand[clickedIndex]['id'])
            this.selectedCard = clickedIndex
        },

        getCardClass(index) {
            if(this.selectedCard == index && this.$store.state.battle.selectedCard != null) return 'selected' 
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

        getFontSize(multiplier = 1) {
            return 'font-size: ' + (this.$store.state.baseFontSize) * multiplier + 'px;'
        },
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
<template>
<div class="battle-interface">
    <div class="top-wrapper">
        <div class="btn" @click="clickSwitch()">Switch</div>
    </div>
    <div class="bottom-wrapper">
        <div class="energy-wrapper text" :style="getFontSize()">{{$store.state.battle.currentEnergy}}/{{$store.state.battle.maxEnergy}}</div>
        <div class="drawPile" :style="getFontSize()">
            <div class="number text">{{drawPile.length}}</div>
        </div>
        <div class="player-hand" :style="getFontSize()">
            <Card 
                v-for="(card, index) in playerHand"
                :key="index"
                :style="displayCardsInHand(index)"
                :id="card.id"
                v-on:click="selectCard(index)"
                v-on:mouseover="hoverOnCard(index)"
                v-on:mouseleave="leaveHover()"
            />
        </div>
        <div class="discardPile" :style="getFontSize()">
            <div class="number text">{{discardPile.length}}</div>
            <Card 
                v-for="(card, index) in discardPile"
                :key="index"
                :id="card.id"
                :style="displayCardsInDiscard(index)"
            />
        </div>
        <div class="end-turn-btn text" :style="getFontSize()" @click="endTurn()">
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

    props: [
        'cardClickedInterface',
        'cardClickedPokemon',
        'cardPlayed',
        'turnStarted',
        'rightClicked',
        'switchClicked'
    ],

    watch: {
        cardClickedInterface: function(newVal) {
            //Le joueur a cliqué dans l'interface avec une carte sélectionnée
            if(newVal) {
                var selectedCardData = this.$store.state.cards.dataCards[this.$store.state.battle.selectedCard]
                //Si la carte a besoin d'une cible spécifique
                if(selectedCardData['target']) {
                    //On la déselectionne
                    this.unSelectCard()
                }

                else {
                    this.playCard()
                }
                this.$store.dispatch('changeinterfaceClicked', false)
                
            }
        },

        //Le joueur a cliqué sur un Pokémon avec une carte sélectionnée
        cardClickedPokemon: function(newVal) {
            if(newVal) {
                this.playCard()
                this.$store.dispatch('changepokemonClicked', false)
            }
        },

        //Sert à repérer quand BattleScene a fini de jouer sa carte, pour la déselectionner et la défausser à ce moment-là
        cardPlayed: function(newVal) {
            if(!newVal) {
                this.discard(this.selectedCard)
                this.unSelectCard()
            }
        },

        turnStarted: function(newVal) {
            if(newVal) {
                this.drawCards(5)
                this.$store.dispatch('changeCurrentEnergy', this.$store.state.battle.maxEnergy)
                this.$store.dispatch('changeSwitchAllowed', true)
            }
        },

        rightClicked: function(newVal) {
            if(newVal) {
                this.unSelectCard()
                this.$store.dispatch('changerightClicked', false)
            }
        },

        switchClicked: function(newVal) {
            if(!newVal) {
                this.resetBattleInterface()
            }
        }
    },

    data: function() {
        return {
            drawPile: [],
            
            playerHand: [],

            cardDrawAnimation: [],
            cardDiscardAnimation: [],

            discardPile: [],

            selectedCard: null,
            hoverCard: null,
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

            //L'endroit où la première carte se positionne
            var baseLeft = 45 - (handSize * 3)

            //L'écart horizontal entre deux cartes
            var leftShift = 7

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
            var bottomShift = 3 * Math.abs(difference)

            var finalBottom = baseBottom - (bottomShift * Math.abs(difference))

            //On ajoute une rotation à toutes les cartes après celle du milieu quand le nombre de cartes en main est pair, pour ne pas avoir de carte avec une rotation à 0
            if(handSize % 2 == 0 && index > lastIndexToRotate) {
                // finalRotate -= baseRotate
            }

            var finalLeft = baseLeft + index * leftShift

            // console.log(this.cardDrawAnimation.includes(index.toString()))

            if(this.cardDrawAnimation.includes(index)) {
                return 'left: 2%; transform: scale(0.1)'
            }

            // else if(this.cardDiscardAnimation.includes(index)) {
            //     return 'left: 98%; transform: scale(0.1)'
            // }

            else {

                if(this.hoverCard != index && this.selectedCard != index) {
                    return 'transform : rotate(' + finalRotate + 'deg); left : ' + finalLeft + '%; bottom: ' + finalBottom + '%;'
                }
    
                else if(this.hoverCard == index && this.selectedCard != index) {
                    return 'transform : rotate(' + finalRotate + 'deg) scale(1.2); left : ' + finalLeft + '%; bottom: ' + finalBottom + '%; z-index: 2;'
                }
    
                else return 'transform : rotate(0deg) scale(1.6); left : ' + finalLeft + '%; bottom: 53%; z-index: 2;'
            }



        },

        displayCardsInDiscard(index) {
            var width = '139%;'
            var height = '285%;'
            var bottom = '-86%;'
            var right = '-25%;'
            var transformInHand = 'scale(1) translate(-440%);'
            var transformInDiscard = 'scale(0) translate(0);'

            if(this.cardDiscardAnimation.includes(index)) {
                return 'width:' + width + 'height:' + height + 'bottom:' + bottom + 'right:' + right + 'transform:' + transformInHand
            }

            else {
                return 'width:' + width + 'height:' + height + 'bottom:' + bottom + 'right:' + right + 'transform:' + transformInDiscard
            }
        },

        // Gestion sélection et hover

        selectCard(clickedIndex) {
            this.$store.dispatch('changeCardSelection', this.playerHand[clickedIndex]['id'])
            this.selectedCard = clickedIndex
        },

        unSelectCard() {
            this.selectedCard = null
            this.$store.dispatch('changeCardSelection', null)
        },

        hoverOnCard(index) {
            this.hoverCard = index
        },

        leaveHover() {
            this.hoverCard = null
        },


        // Gestion pioche et défausse


        drawCards(amount) {

            //Si il y a en tout moins de cartes que ce qui ddoit être pioché (pioche et défausse), on ne pioche que ce que l'on peut
            if(amount > this.drawPile.length + this.discardPile.length) {
                var difference = amount - (this.drawPile.length + this.discardPile.length)
                amount -= difference
            }

            //Si il y a moins de cartes dans la pioche que ce que l'on doit piocher
            if (amount > this.drawPile.length) {
                this.dumpInto(this.discardPile, this.drawPile)
            }

            for(var i = 0; i < amount; i++) {

                //On vérifie que la main n'est pas pleine
                if (this.playerHand.length < this.maxHandSize) {
                    this.moveCard(this.drawPile, this.playerHand)
                    this.playDrawAnimation(this.playerHand.length - 1)
                }

                else this.moveCard(this.drawPile, this.discardPile)
            }
            
        },

        //Utilisé exclusivement pour défausser depuis la main du joueur
        discard(index) {
            this.discardPile.push(this.playerHand.splice(index, 1)[0])
            this.playDiscardAnimation(this.discardPile.length - 1)
        },

        //Utilisé pour piocher
        moveCard(from, to) {
            to.push(from.shift())
        },

        //Appel en boucle de movecard pour passer tout un tableau dans un autre
        dumpInto(from, to) {
            for(var i = from.length - 1; i >= 0; i--) {
                this.moveCard(from, to)
            }
        },

        // Gestion animations de pioche et de défausse

        playDrawAnimation(index) {
            this.cardDrawAnimation.push(index)
            setTimeout(() => {
                this.cardDrawAnimation.splice(this.cardDrawAnimation.indexOf(index), 1)
            }, 10)
        },

        playDiscardAnimation(index) {
            this.cardDiscardAnimation.push(index)
            setTimeout(() => {
                this.cardDiscardAnimation.splice(this.cardDiscardAnimation.indexOf(index), 1)
            }, 10)
        },


        // Gestion interactions

        playCard() {
            var selectedCardData = this.$store.state.cards.dataCards[this.$store.state.battle.selectedCard]
            
            if(this.$store.state.battle.currentEnergy >= selectedCardData['cost']) {

                if(selectedCardData['draw'] > 0) this.drawCards(selectedCardData['draw'])
                if(selectedCardData['energy'] > 0) this.gainEnergy(selectedCardData['energy'])
                this.$store.dispatch('changecardPlayed', true)

                this.loseEnergy(selectedCardData['cost'])
            }

            else this.$store.dispatch('changeCardSelection', null)
        },

        endTurn() {
            if(this.$store.state.battle.playerTurn) {

                //Ici utilisation de discard plutôt que dumpInto pour pouvoir avoir l'animation de défausse des cartes
                for(var i = this.playerHand.length - 1; i >= 0; i--) {
                    this.discard(i)
                }
                
                this.$store.dispatch('changePlayerTurn', false)
            }
        },


        // Gestion Energie

        gainEnergy(amount) {
            var currentEnergy = this.$store.state.battle.currentEnergy
            this.$store.dispatch('changeCurrentEnergy', currentEnergy += amount)
        },

        loseEnergy(amount) {
            var currentEnergy = this.$store.state.battle.currentEnergy
            this.$store.dispatch('changeCurrentEnergy', currentEnergy -= amount)
        },


        clickSwitch() {
            if(this.switchAllowed) {
                this.$store.dispatch('changeSwitchClicked', true)
                this.$store.dispatch('changeSwitchAllowed', false)
            }
        },


        // Gestion tailles de police


        getFontSize(multiplier = 1) {
            return 'font-size: ' + (this.$store.state.baseFontSize) * multiplier + 'px;'
        },

        resetBattleInterface() {
            this.drawPile = []
            this.discardPile = []
            this.playerHand = []

            this.drawPile = this.$store.state.playerTeam.team[this.activeIndex]['deck'].map(x => x)
            this.$store.dispatch('changePlayerTurn', true)
        },

    },

    computed: {
        activeIndex() {
            return this.$store.getters.getActiveIndex
        },

        switchAllowed() {
            return this.$store.getters.getSwitchAllowed
        }
    },

    mounted: function() {
        this.resetBattleInterface()
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
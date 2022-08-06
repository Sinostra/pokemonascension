<template>
<div class="battle-interface">
    <!-- <div class="top-wrapper">
        <div class="btn" @click="clickSwitch()">Switch</div>
    </div> -->
    <div class="bottom-wrapper">
        <div class="energy-wrapper text" :style="getFontSize()">
            {{$store.state.battle.currentEnergy}}/{{$store.state.battle.maxEnergy}}
        </div>

        <div class="drawPile" :style="getFontSize()">
            <div class="number text">{{drawPile.length}}</div>
        </div>

        <Hand
            :content="hand"
            :selectedCardIndex="selectedCardIndex"
            @onCardClicked="selectCard"
        ></Hand>

        <PlayCardModal v-if="$store.getters.selectedCard !== null"></PlayCardModal>

        <DiscardFromSelectManager
            :content="discardFromSelectManagerContent"
        ></DiscardFromSelectManager>

        <DiscardFromHandManager
            :content="discardFromHandManagerContent"
        ></DiscardFromHandManager>

        <div class="discardPile" :style="getFontSize()">
            <div class="number text">{{discardPile.length}}</div>
        </div>

        <div class="end-turn-btn text" :style="getFontSize()" @click="endTurn()">
            End Turn
        </div>
    </div>
</div>
</template>

<script lang="ts">
import Hand from '../interface/Hand.vue'
import PlayCardModal from '../interface/PlayCardModal.vue'
import DiscardFromSelectManager from '../interface/discard/DiscardFromSelectManager.vue'
import DiscardFromHandManager from '../interface/discard/DiscardFromHandManager.vue'
import { Options, Vue } from 'vue-class-component'

@Options({
    name: "BattleInterface",
    components: {
        Hand,
        PlayCardModal,
        DiscardFromSelectManager,
        DiscardFromHandManager
    }
})

export default class BattleInterface extends Vue {

    private readonly maxCardsInHand: number = 10
    private readonly delayBetweenDraws: number = 500

    private selectedCardIndex: number | null = null

    private canEndTurn: boolean = false

    private drawPile: string[] = []
    private hand: string[] = []
    private discardPile: string[] = []
    private exhaustPile: string[] = []

    private discardFromHandManagerContent: string[] = []
    private discardFromSelectManagerContent: string[] = []

    private selectCard(cardIndex): void {
        if(cardIndex !== null){
            this.selectedCardIndex = cardIndex
            this.$store.dispatch("selectCard", this.hand[cardIndex])
            
        } 
        else {
            this.selectedCardIndex = null
            this.$store.dispatch("selectCard", null)
        } 
        
    }

    private draw(amount): void {
        if(this.hand.length < this.maxCardsInHand) {
            if(amount > 0) {
                
                if(this.drawPile.length) {
                    this.hand.push(this.drawPile.shift() as string)
                }

                else if(this.discardPile.length) {

                    this.dumpInto(this.discardPile, this.drawPile)
                    this.hand.push(this.drawPile.shift() as string)
                }

                amount --
                if(amount == 0) {
                    this.$store.dispatch("drawIsDone")
                    this.canEndTurn = true
                }
                setTimeout(() => {
                    this.draw(amount)
                }, this.delayBetweenDraws)
            }
        }
    }

    private discardFromSelect(index): void {
        const cardDiscarded = this.hand.splice(index, 1)[0]
        this.discardFromSelectManagerContent.push(cardDiscarded)
    }

    private dumpInto(from, to) {
        for (let i = from.length; i > 0; i--) {
            to.push(from.shift() as string)
        }
    }

    private endTurn() {
        if(this.canEndTurn) {
            this.dumpInto(this.hand, this.discardFromHandManagerContent)
            setTimeout(() =>  {
                this.dumpInto(this.discardFromHandManagerContent, this.discardPile)
                this.$store.dispatch("startNewTurn")
            }, 500)
        }
    }

    private getFontSize(multiplier = 1) {
        return 'font-size: ' + (this.$store.state.settings.baseFontSize) * multiplier + 'px;'
    }

    private refillPlayerDeck() {
        this.drawPile = this.$store.state.playerTeam.team[this.$store.getters.getActiveIndex].deck
    }

    public mounted() {
        this.$store.subscribeAction((action) => {
            if(action.type === "cardToBeDrawn") {
                this.draw(action.payload)
                this.canEndTurn = false
            }

            if(action.type === "rightClick") {
                this.selectCard(null)
            }

            if(action.type === "discardCurrentlySelectedCard") {
                const cardBeingDiscarded = this.selectedCardIndex
                this.selectCard(null)
                this.discardFromSelect(cardBeingDiscarded)
            }

            if(action.type === "cardDonePlayed") {
                this.dumpInto(this.discardFromSelectManagerContent, this.discardPile)
            }
        })
        this.refillPlayerDeck()
    }

} 
</script>

<style lang="scss" scoped>
@import './style/battleInterface.scss';
</style>
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

        <DiscardManager
            :content="discardManagerContent"
        ></DiscardManager>

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
import DiscardManager from '../interface/DiscardManager.vue'
import { Options, Vue } from 'vue-class-component'

@Options({
    name: "BattleInterface",
    components: {
        Hand,
        PlayCardModal,
        DiscardManager
    }
})

export default class BattleInterface extends Vue {

    private readonly maxCardsInHand: number = 10
    private readonly delayBetweenDraws: number = 500

    private selectedCardIndex: number | null = null

    private drawPile: string[] = []
    private hand: string[] = []
    private discardPile: string[] = ["001", "002", "003", "004", "005"]
    private exhaustPile: string[] = []

    private discardManagerContent: string[] = []

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
                if(amount == 0) this.$store.dispatch("drawIsDone")
                setTimeout(() => {
                    this.draw(amount)
                }, this.delayBetweenDraws)
            }
        }
    }

    private discard(index): void {
        const cardPlayed = this.hand.splice(index, 1)[0]
        this.discardManagerContent.push(cardPlayed)
    }

    private dumpInto(from, to) {
        for (let i = from.length; i > 0; i--) {
            to.push(from.shift() as string)
        }
    }

    private getFontSize(multiplier = 1) {
        return 'font-size: ' + (this.$store.state.settings.baseFontSize) * multiplier + 'px;'
    }

    public mounted() {
        this.$store.subscribeAction((action) => {
            if(action.type === "cardToBeDrawn") {
                this.draw(action.payload)
            }

            if(action.type === "rightClick") {
                this.selectCard(null)
            }

            if(action.type === "discardCurrentlySelectedCard") {
                const cardBeingDiscarded = this.selectedCardIndex
                this.selectCard(null)
                this.discard(cardBeingDiscarded)
            }

            if(action.type === "cardDonePlayed") {
                this.dumpInto(this.discardManagerContent, this.discardPile)
            }
        })

        this.draw(5)
    }

} 
</script>

<style lang="scss" scoped>
@import './style/battleInterface.scss';
</style>
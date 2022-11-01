<template>
<div :class="hasSelectedCardTarget ? 'arrow-cursor' : ''" class="battle-interface">
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
            :draggedCardIndex="selectedCardIndex"
            @onCardDragged="selectCard"
            @discardFromSelectAnimEnded="ondiscardFromSelectAnimEnded"
        ></Hand>

        <DiscardFromSelectManager
            :content="discardFromSelectManagerContent"
        ></DiscardFromSelectManager>

        <DiscardFromHandManager
            :content="discardFromHandManagerContent"
        ></DiscardFromHandManager>

        <div class="discardPile" :style="getFontSize()">
            <div class="number text">{{discardPile.length}}</div>
        </div>

        <div class="end-turn-btn text" :class="canEndTurn ? '' : 'disabled'" :style="getFontSize()" @click="endTurn()">
            End Turn
        </div>
    </div>
</div>
</template>

<script lang="ts">
import Hand from './Hand.vue'
import DiscardFromSelectManager from './discard/DiscardFromSelectManager.vue'
import DiscardFromHandManager from './discard/DiscardFromHandManager.vue'
import { Options, Vue } from 'vue-class-component'
import { inject } from 'vue'
import cloneDeep from "lodash.clonedeep"

@Options({
    name: "BattleInterface",
    components: {
        Hand,
        DiscardFromSelectManager,
        DiscardFromHandManager
    }
})

export default class BattleInterface extends Vue {

    public readonly maxCardsInHand: number = 10
    public readonly delayBetweenDraws: number = 500

    public selectedCardIndex: number | null = null

    public canEndTurn: boolean = false

    public drawPile: string[] = []
    public hand: string[] = []
    public discardPile: string[] = []
    public exhaustPile: string[] = []

    public discardFromHandManagerContent: string[] = []
    public discardFromSelectManagerContent: string[] = []

    private currentlyPlayedEffectDone: boolean = false;
    private currentlyPlayedAnimDone: boolean = false;

    private emitter: any = inject('emitter')

    get hasSelectedCardTarget(): boolean {
        if(this.selectedCardIndex === null) {
            return false
        }

        else {
            const cardId = this.hand[this.selectedCardIndex]
            return this.$store.state.cards.dataCards[cardId]['target']
        }
    }

    public selectCard(cardIndex): void {
        if(cardIndex !== null){
            this.selectedCardIndex = cardIndex
            this.$store.commit("selectCard", this.hand[cardIndex])
            
        } 
        else {
            this.selectedCardIndex = null
            this.$store.commit("selectCard", null)
        } 
        
    }

    public draw(amount): void {
        if(this.hand.length === this.maxCardsInHand || amount === 0 || (!this.drawPile.length && !this.discardPile.length)) {
            this.emitter.emit("drawIsDone")
            return
        }

        if(this.drawPile.length) {
            this.hand.push(this.drawPile.shift() as string)
        }
        else {
            this.dumpInto(this.discardPile, this.drawPile)
            this.drawPile.sort(() => {
                if(Math.random() > 0.5) return -1
                else return 1
            })
            this.hand.push(this.drawPile.shift() as string)
        }

        amount--
        setTimeout(() => {
            this.draw(amount)
        }, this.delayBetweenDraws)

    }

    public discardFromSelect(index): void {
        const cardDiscarded = this.hand.splice(index, 1)[0]
        if(this.$store.state.cards.dataCards[cardDiscarded]['exhaust']) {
            this.exhaustPile.push(cardDiscarded)
        }
        else {
            this.discardFromSelectManagerContent.push(cardDiscarded)
        }
        
    }

    public dumpInto(from, to) {
        for (let i = from.length; i > 0; i--) {
            to.push(from.shift() as string)
        }
    }

    public endTurn() {
        if(this.canEndTurn) {
            this.canEndTurn = false
            this.dumpInto(this.hand, this.discardFromHandManagerContent)
            setTimeout(() =>  {
                this.dumpInto(this.discardFromHandManagerContent, this.discardPile)
                this.emitter.emit("endPlayerTurn")
            }, 500)
        }
    }

    public getFontSize(multiplier = 1) {
        return 'font-size: ' + (this.$store.state.settings.baseFontSize) * multiplier + 'px;'
    }

    public refillPlayerDeck() {
        this.drawPile = cloneDeep(this.$store.state.playerTeam.team[this.$store.getters.getActiveIndex].deck)
        this.drawPile.sort(() => {
            if(Math.random() > 0.5) return -1
            else return 1
        })
    }

    private checkCardAnimEffectDone() {
        if(this.currentlyPlayedEffectDone && this.currentlyPlayedAnimDone) {
            this.discardPile.push(this.discardFromSelectManagerContent.shift() as string)
            this.currentlyPlayedEffectDone = false
            this.currentlyPlayedAnimDone = false
        }
    }


    private oncardDonePlayed() {
        this.currentlyPlayedEffectDone = true
        this.checkCardAnimEffectDone()
    }

    private ondiscardFromSelectAnimEnded() {
        this.currentlyPlayedAnimDone = true
        this.checkCardAnimEffectDone()
    }

    private oncardToBeDrawn(payload) {
        this.draw(payload.draw)
    }

    private onDiscardCurrentlySelectedCard() {
        const cardBeingDiscarded = this.selectedCardIndex
        this.selectCard(null)
        this.discardFromSelect(cardBeingDiscarded)
    }

    private onPlayerTurn() {
        this.canEndTurn = true
    }

    private onRightClick() {
        this.selectCard(null)
    }

    public mounted() {

        this.emitter.on("cardDonePlayed", this.oncardDonePlayed)
        this.emitter.on("discardFromSelectAnimEnded", this.ondiscardFromSelectAnimEnded)
        this.emitter.on("draw", this.oncardToBeDrawn)
        this.emitter.on("discardCurrentlySelectedCard", this.onDiscardCurrentlySelectedCard)
        this.emitter.on("playerTurn", this.onPlayerTurn)
        this.emitter.on("rightClick", this.onRightClick)

        this.refillPlayerDeck()
    }

    public beforeUnmount() {
        this.emitter.off("cardDonePlayed", this.oncardDonePlayed)
        this.emitter.off("discardFromSelectAnimEnded", this.ondiscardFromSelectAnimEnded)
        this.emitter.off("draw", this.oncardToBeDrawn)
        this.emitter.off("discardCurrentlySelectedCard", this.onDiscardCurrentlySelectedCard)
        this.emitter.off("playerTurn", this.onPlayerTurn)
        this.emitter.off("rightClick", this.onRightClick)
    }

} 
</script>

<style lang="scss" scoped>
@import './style/battleInterface.scss';
</style>
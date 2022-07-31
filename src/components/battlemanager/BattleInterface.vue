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
        ></Hand>

        <PlayCardModal v-if="$store.getters.selectedCard !== null"></PlayCardModal>

        <DiscardManager></DiscardManager>

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

    private drawPile: string[] = []
    private hand: string[] = []
    private discardPile: string[] = ["001"]
    private exhaustPile: string[] = []

    private draw(amount): void {
        if(this.hand.length < this.maxCardsInHand) {
            if(amount > 0) {
                
                if(this.drawPile.length) {
                    this.hand.push(this.drawPile.shift() as string)
                }

                else if(this.discardPile.length) {

                    for (let i = this.discardPile.length; i > 0; i--) {
                        this.drawPile.push(this.discardPile.shift() as string)
                    }

                    this.hand.push(this.drawPile.shift() as string)
                }

                amount --
                if(amount == 0) this.$store.dispatch("drawIsDone")
                setTimeout(() => {
                    this.draw(amount)
                }, 500)
            }
        }
    }

    private discard(index): void {
        this.hand.splice(index, 1)[0]
        this.$store.dispatch("removeCardFromHand", {index, id: this.hand[index]})
    }

    private getFontSize(multiplier = 1) {
        return 'font-size: ' + (this.$store.state.settings.baseFontSize) * multiplier + 'px;'
    }

    public mounted() {
        this.$store.subscribeAction((action) => {
            if(action.type === "cardToBeDrawn") {
                this.draw(action.payload)
            }
        })

        this.draw(2)
    }

} 
</script>

<style lang="scss" scoped>
@import './style/battleInterface.scss';
</style>
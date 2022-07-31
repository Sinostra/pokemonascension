<template>
    <div class="battlemanager">
        <BattleScene/>
        <BattleInterface/>
    </div>
</template>

<script lang="ts">
import BattleScene from './battlemanager/BattleScene.vue'
import BattleInterface from './battlemanager/BattleInterface.vue'
import { Options, Vue } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'

@Options({
    name: "BattleManager",
    components: {
        BattleScene,
        BattleInterface
    }
})

export default class BattleManager extends Vue {
    private cardsAreBeingDrawn: boolean = false
    private cardIsBeingPlayed: boolean = false
    private cardBeingPlayed = {}

    @Watch('cardsAreBeingDrawn')
    onStateChanged(newVal: boolean) {
        if(!newVal && this.cardIsBeingPlayed) {
            this.$store.dispatch("cardDonePlayed")
            this.cardIsBeingPlayed = false
            this.cardBeingPlayed = {}
        }
    }

    private playCard(cardId: string, targetIndex: number | null) {
        this.cardIsBeingPlayed = true
        this.cardBeingPlayed = this.$store.state.cards.dataCards[cardId]
        this.$store.dispatch("discardCurrentlySelectedCard")

    }

    private playCardEffects() {
    
        if(this.cardBeingPlayed !== {}) {
            this.$store.dispatch("spendEnergy", this.cardBeingPlayed['cost'])
            
            if(this.cardBeingPlayed['draw']) {
                this.$store.dispatch("cardToBeDrawn", this.cardBeingPlayed['draw'])
            }
    
            if(this.cardBeingPlayed['damage']) {
    
            }
    
            if(this.cardBeingPlayed['block']) {
    
            }
    
            if(this.cardBeingPlayed['energy']) {
                this.$store.dispatch("getEnergy", this.cardBeingPlayed['energy'])
            }

        }
    }

    public mounted() {
        this.$store.subscribeAction((action) => {
            if(action.type === "playCurrentlySelectedCard") {
                this.playCard(this.$store.getters.selectedCard, action.payload)
            }

            if(action.type === "foePokemonHasBeenClicked" && this.$store.state.cards.dataCards[this.$store.getters.selectedCard]['target']) {
                this.playCard(this.$store.getters.selectedCard, action.payload)
            }

            if(action.type === "draw") {
                this.cardsAreBeingDrawn = true
            }

            if(action.type === "drawIsDone") {
                this.cardsAreBeingDrawn = false
            }

            if(action.type === "removeCardFromHand") {
                if(this.cardIsBeingPlayed) {
                    this.playCardEffects()
                }
            }
        })

    }

}
</script>

<style lang='scss' scoped>
.battlemanager {
    position: absolute;
    width: 100%;
    height: 100%;
}

</style>



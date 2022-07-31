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
    private cardBeingPlayed: any = null
    private targetIndex: number | null = null
    // private cardsAreBeingDrawn: boolean = false
    // private cardIsBeingPlayed: boolean = false
    

    // @Watch('cardsAreBeingDrawn')
    // onStateChanged(newVal: boolean) {
    //     if(!newVal && this.cardIsBeingPlayed) {
    //         this.$store.dispatch("cardDonePlayed")
    //         this.cardIsBeingPlayed = false
    //         this.cardBeingPlayed = {}
    //     }
    // }

    private playCard(cardId: string, targetIndex: number | null) {
        this.cardBeingPlayed = this.$store.state.cards.dataCards[cardId]
        this.targetIndex = targetIndex
        this.$store.dispatch("cardIsPlaying")
        this.$store.dispatch("discardCurrentlySelectedCard")
        setTimeout(() => {this.playCardEffects()}, 500)
    }

    private playCardEffects() {
    
        if(this.cardBeingPlayed !== null) {
            this.$store.dispatch("spendEnergy", this.cardBeingPlayed['cost'])
    
            if(this.cardBeingPlayed['damage']) {
    
            }
    
            if(this.cardBeingPlayed['block']) {
    
            }
    
            if(this.cardBeingPlayed['energy']) {
                this.$store.dispatch("getEnergy", this.cardBeingPlayed['energy'])
            }

            if(this.cardBeingPlayed['draw']) {
                this.$store.dispatch("cardToBeDrawn", this.cardBeingPlayed['draw'])
            }

            else {
                this.$store.dispatch("cardDonePlayed")
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

            if(action.type === "drawIsDone") {
                if(this.cardBeingPlayed !== null) {
                    this.cardBeingPlayed = null
                    this.targetIndex = null
                    this.$store.dispatch("cardDonePlayed")
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



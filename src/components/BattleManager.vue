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
    private cardsBeginningTurn: number = 5

    private startPlayerTurn() {
        this.$store.dispatch("cardToBeDrawn", this.cardsBeginningTurn)
    }

    private playCard(cardId: string, targetIndex: number | null) {
        this.cardBeingPlayed = this.$store.state.cards.dataCards[cardId]
        this.targetIndex = targetIndex
        this.$store.dispatch("cardIsPlaying")
        this.$store.dispatch("discardCurrentlySelectedCard")
        setTimeout(() => {this.playCardEffects()}, 0)
    }

    private playCardEffects() {
    
        if(this.cardBeingPlayed !== null) {
            this.$store.dispatch("spendEnergy", this.cardBeingPlayed['cost'])
    
            if(this.cardBeingPlayed['damage']) {
                if(this.cardBeingPlayed['damageAOE']) {
                    this.$store.dispatch("damageAllFoes", {
                        damage: this.cardBeingPlayed['damage'],
                        type: this.cardBeingPlayed['type'],
                        ignoreBlock: this.cardBeingPlayed['ignoreBlock'],
                    })
                }

                else this.$store.dispatch("damageFoe", {
                    damage: this.cardBeingPlayed['damage'],
                    type: this.cardBeingPlayed['type'],
                    ignoreBlock: this.cardBeingPlayed['ignoreBlock'],
                    target :this.targetIndex
                })
            }
    
            if(this.cardBeingPlayed['block']) {
                this.$store.dispatch("playerGetBlock", this.cardBeingPlayed['block'])
            }
    
            if(this.cardBeingPlayed['energy']) {
                this.$store.dispatch("getEnergy", this.cardBeingPlayed['energy'])
            }

            if(this.cardBeingPlayed['draw']) {
                this.$store.dispatch("cardToBeDrawn", this.cardBeingPlayed['draw'])
            }

            else {
                setTimeout(() => {this.$store.dispatch("cardDonePlayed")}, 500)
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
        this.startPlayerTurn()
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



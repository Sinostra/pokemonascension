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
    private cardsBeginningTurn: number = 5

    private startPlayerTurn() {
        this.$store.dispatch("startNewTurn")
        this.$store.dispatch("cardToBeDrawn", this.cardsBeginningTurn)
    }

    private playCard(cardId: string, targetIndex: number | null) {
        this.cardBeingPlayed = this.$store.state.cards.dataCards[cardId]
        this.$store.dispatch("cardIsPlaying")
        this.$store.dispatch("discardCurrentlySelectedCard")
        setTimeout(() => {
            this.$store.dispatch("spendEnergy", this.cardBeingPlayed['cost'])
            this.playEffects(this.cardBeingPlayed, "player", targetIndex)
        }, 0)
    }

    private playEffects(effects: any, user: number | string, target: number | string | null) {
    
        if(effects['damage']) {
            if(effects['damageAOE']) {
                this.$store.dispatch("damageAllFoes", {
                    damage: effects['damage'],
                    type: effects['type'],
                    ignoreBlock: effects['ignoreBlock'],
                })
            }

            else this.$store.dispatch("damage", {
                damage: effects['damage'],
                type: effects['type'],
                ignoreBlock: effects['ignoreBlock'],
                target
            })
        }

        if(effects['block']) {
            this.$store.dispatch("gainBlock", {
                user: user,
                amount: effects['block']
            })
        }

        if(effects['energy']) {
            this.$store.dispatch("getEnergy", effects['energy'])
        }

        if(effects['draw']) {
            this.$store.dispatch("cardToBeDrawn", effects['draw'])
        }

        else {
            setTimeout(() => {
                this.cardBeingPlayed = null
                this.$store.dispatch("cardDonePlayed")
            }, 500)
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



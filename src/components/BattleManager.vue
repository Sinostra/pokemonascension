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

    private playCard(cardId: string, index: number | null) {
        const cardBeingPlayed = this.$store.state.cards.dataCards[cardId]
        this.$store.dispatch("spendEnergy", cardBeingPlayed['cost'])

        if(cardBeingPlayed['draw']) {
            this.$store.dispatch("cardToBeDrawn", cardBeingPlayed['draw'])
        }

        if(cardBeingPlayed['damage']) {

        }

        if(cardBeingPlayed['block']) {

        }

        if(cardBeingPlayed['energy']) {
            this.$store.dispatch("getEnergy", cardBeingPlayed['energy'])
        }

        this.$store.dispatch("discardCurrentlySelectedCard")


    }

    public mounted() {
        this.$store.subscribeAction((action) => {
            if(action.type === "playCurrentlySelectedCard") {
                this.playCard(this.$store.state.board.selectedCard, action.payload)
            }

            if(action.type === "foePokemonHasBeenClicked" && this.$store.state.cards.dataCards[this.$store.state.board.selectedCard]['target']) {
                this.playCard(this.$store.state.board.selectedCard, action.payload)
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



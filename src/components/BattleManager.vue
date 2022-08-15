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

        const playMultipleAttacks = (time = 1) => {
            const effects = time === 1 ? this.cardBeingPlayed : {
                damage: this.cardBeingPlayed['damage'],
                type: this.cardBeingPlayed['type'],
                ignoreBlock: this.cardBeingPlayed['ignoreBlock']
            }
            this.playEffects(effects, "player", targetIndex)

            if(time < this.cardBeingPlayed['damageTimes']) {
                time++
                setTimeout(() => {playMultipleAttacks(time)}, 500)
            }

            else {
                this.$store.dispatch("cardDonePlayed")
            }
        }

        setTimeout(() => {
            this.$store.dispatch("spendEnergy", this.cardBeingPlayed['cost'])

            if(this.cardBeingPlayed['damageTimes'] <= 1) {
                this.playEffects(this.cardBeingPlayed, "player", targetIndex)
            }

            else {
                playMultipleAttacks()
            }
        }, 0)
    }

    private playEffects(effects: any, user: number | string, target: number | string | null) {
    
        if(effects['damage']) {
            let damage = user === "player" ? effects['damage'] + this.$store.state.battle.playerAttack : effects['damage']
            if(effects['damageAOE']) {
                this.$store.dispatch("damageAllFoes", {
                    damage,
                    type: effects['type'],
                    ignoreBlock: effects['ignoreBlock'],
                })
            }

            else this.$store.dispatch("damage", {
                damage,
                type: effects['type'],
                ignoreBlock: effects['ignoreBlock'],
                target
            })
        }

        if(effects['block']) {
            let amount = user === "player" ? effects['block'] + this.$store.state.battle.playerDefense : effects['block']
            this.$store.dispatch("gainBlock", {
                user,
                amount
            })
        }

        if(effects['buffSelfAttack']) {
            console.log(effects['buffSelfAttack'])
            if(user === "player") this.$store.dispatch("buffPlayerAttack", effects['buffSelfAttack'])
            else this.$store.dispatch("buffFoeAttack", {user, amount: effects['buffSelfAttack']})
        }

        if(effects['buffSelfDefense']) {
            console.log(effects['buffSelfDefense'])
            if(user === "player") this.$store.dispatch("buffPlayerDefense", effects['buffSelfDefense'])
            else this.$store.dispatch("buffFoeDefense", {user, amount: effects['buffSelfDefense']})
        }

        if(effects['energy']) {
            this.$store.dispatch("getEnergy", effects['energy'])
        }

        if(effects['draw']) {
            this.$store.dispatch("cardToBeDrawn", effects['draw'])
        }

        if(!effects['draw'] && effects['damageTimes'] <= 1) {
            setTimeout(() => {
                this.$store.dispatch("cardDonePlayed")
            }, 500)
        }

    }

    private playFoeTurn(index) {
        if(index < this.$store.state.foes.foeTeam.length) {
            this.$store.dispatch("foeTurn", index)
        }

        else {
            this.startPlayerTurn()
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
                    this.$store.dispatch("cardDonePlayed")
                }
            }

            if(action.type === "endPlayerTurn") {
                setTimeout(() => {this.playFoeTurn(0)}, 1000)
            }

            if(action.type === "playFoeMove") {
                this.playEffects(action.payload.effect, action.payload.user, "player")
            }

            if(action.type === "foeMovePlayed") {
                setTimeout(() => {this.playFoeTurn(action.payload + 1)}, 1000)            
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



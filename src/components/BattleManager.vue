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
    private cardsBeginningTurn: number = 5
    private energyPerTurn = 3

    private turnSteps = ["playerDraw", "startOfPlayerTurnEffects", "playerTurn", "endOfPlayerTurnEffects", "foesTurn", "endOfFoesTurnEffects"]
    private currentTurnStepIndex = -1;

    private effectsPlayed = 0

    private startOfPlayerTurnEffects = [{draw: 1}]
    private endOfPlayerTurnEffects = []
    private endOfFoesTurnEffects = []

    //Gère le déroulé du tour
    @Watch("currentTurnStepIndex")
    onTurnStepChange(newValue) {
        if(newValue >= this.turnSteps.length) {
            this.currentTurnStepIndex = 0
            return
        }

        let currentEffectsArray: any[] | null = null;

        if(this.turnSteps[this.currentTurnStepIndex] === "playerDraw") {
            this.startPlayerTurn()
        }
        else if(this.turnSteps[this.currentTurnStepIndex] === "startOfPlayerTurnEffects") {
            currentEffectsArray = this.startOfPlayerTurnEffects
        }
        else if(this.turnSteps[this.currentTurnStepIndex] === "playerTurn") {
            this.$store.dispatch("playerTurn")
        }
        else if(this.turnSteps[this.currentTurnStepIndex] === "endOfPlayerTurnEffects") {
            currentEffectsArray = this.endOfPlayerTurnEffects
        }
        else if(this.turnSteps[this.currentTurnStepIndex] === "foesTurn") {
            this.playFoeTurn(0)
        }
        else if(this.turnSteps[this.currentTurnStepIndex] === "endOfFoesTurnEffects") {
            currentEffectsArray = this.endOfFoesTurnEffects
        }

        if(!!currentEffectsArray) {
            if(currentEffectsArray.length) {
                this.playEffects(currentEffectsArray[this.effectsPlayed], null, null)
            }
            else {
                this.currentTurnStepIndex++
            }
        }
    }

    //Gère l'appel des effets de l'étape en cours
    @Watch("effectsPlayed")
    onValueChange(newValue, oldValue) {
        if(newValue > oldValue){
            let currentEffectsArray: any[] | null = null;
            if(this.turnSteps[this.currentTurnStepIndex] === "startOfPlayerTurnEffects") {
                currentEffectsArray = this.startOfPlayerTurnEffects
            }
            else if(this.turnSteps[this.currentTurnStepIndex] === "endOfPlayerTurnEffects") {
                currentEffectsArray = this.endOfPlayerTurnEffects
            }
            else if(this.turnSteps[this.currentTurnStepIndex] === "endOfFoesTurnEffects") {
                currentEffectsArray = this.endOfFoesTurnEffects
            }
    
            if(!!currentEffectsArray) {
                if(newValue >= currentEffectsArray.length) {
                    this.currentTurnStepIndex++
                    this.effectsPlayed = 0
                }
                else this.playEffects(currentEffectsArray[this.effectsPlayed], null, null)
            }
        }
    }

    /* Séquence d'un tour : Début du tour => pioche du joueur => effets de début de tour => le joueur joue son tour => effets de fin de tour => tour des ennemis */

    private startPlayerTurn() {
        this.$store.dispatch("startNewTurn")
        this.$store.dispatch("setEnergy", this.energyPerTurn)
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
                ignoreBlock: this.cardBeingPlayed['ignoreBlock'],
                damageTimes: this.cardBeingPlayed['damageTimes']
            }
            this.playEffects(effects, "player", targetIndex)

            if(time < this.cardBeingPlayed['damageTimes']) {
                time++
                setTimeout(() => {playMultipleAttacks(time)}, 500)
            }

            else {
                this.effectEndCallBack()
            }
        }

        setTimeout(() => {
            this.$store.dispatch("spendEnergy", this.cardBeingPlayed['cost'])

            if(!this.cardBeingPlayed['damageTimes'] || this.cardBeingPlayed['damageTimes'] <= 1) {
                this.playEffects(this.cardBeingPlayed, "player", targetIndex)
            }

            else {
                playMultipleAttacks()
            }
        }, 0)
    }

    private playEffects(effects: any, user: number | string | null, target: number | string | null) {
    
        if(effects['damage']) {
            let damage = user === "player" ? effects['damage'] + this.$store.state.battle.playerAttack : effects['damage']
            damage < 0 ? 0 : damage
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

        if(effects['selfDamage']) {
            this.$store.dispatch("damage", {
                damage: effects['selfDamage'],
                type: null,
                ignoreBlock: true,
                target: user
            })
        }

        if(effects['selfHeal']) {
            this.$store.dispatch("heal", {
                amount: effects['selfHeal'],
                user
            })
        }

        if(effects['block']) {
            let amount = user === "player" ? effects['block'] + this.$store.state.battle.playerDefense : effects['block']
            amount < 0 ? 0 : amount
            this.$store.dispatch("gainBlock", {
                user,
                amount
            })
        }

        if(effects['buffSelfAttack']) {
            if(user === "player") this.$store.dispatch("buffPlayerAttack", effects['buffSelfAttack'])
            else this.$store.dispatch("buffFoeAttack", {user, amount: effects['buffSelfAttack']})
        }

        if(effects['buffSelfDefense']) {
            if(user === "player") this.$store.dispatch("buffPlayerDefense", effects['buffSelfDefense'])
            else this.$store.dispatch("buffFoeDefense", {user, amount: effects['buffSelfDefense']})
        }

        if(effects['debuffAttack']) {
            if(user !== "player") this.$store.dispatch("deBuffPlayerAttack", effects['debuffAttack'])
            else this.$store.dispatch("deBuffFoeAttack", {target, amount: effects['debuffAttack']})
        }

        if(effects['debuffDefense']) {
            if(user !== "player") this.$store.dispatch("deBuffPlayerDefense", effects['debuffDefense'])
            else this.$store.dispatch("deBuffFoeDefense", {target, amount: effects['debuffDefense']})
        }

        if(effects['energy']) {
            this.$store.dispatch("getEnergy", effects['energy'])
        }

        if(effects['draw']) {
            this.$store.dispatch("cardToBeDrawn", effects['draw'])
        }

        if(!effects['draw'] && (!effects['damageTimes'] || effects['damageTimes'] <= 1)) {
            setTimeout(() => {
                this.effectEndCallBack()
            }, 500)
        }

    }

    private effectEndCallBack() {
        if(this.turnSteps[this.currentTurnStepIndex] === "playerTurn") {
            this.$store.dispatch("cardDonePlayed")
        }

        else if(
            this.turnSteps[this.currentTurnStepIndex] === "startOfPlayerTurnEffects" || 
            this.turnSteps[this.currentTurnStepIndex] === "endOfPlayerTurnEffects" || 
            this.turnSteps[this.currentTurnStepIndex] === "endOfFoesTurnEffects"
            ) {
            this.effectsPlayed++
        }
    }

    private playFoeTurn(index) {
        if(index < this.$store.state.foes.foeTeam.length) {
            this.$store.dispatch("foeTurn", index)
        }

        else {
            this.currentTurnStepIndex++
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
                if(this.turnSteps[this.currentTurnStepIndex] === "playerDraw") {
                    this.currentTurnStepIndex++
                }

                else {
                    this.effectEndCallBack()
                }
            }

            if(action.type === "endPlayerTurn") {
                setTimeout(() => {this.currentTurnStepIndex++}, 1000)
            }

            if(action.type === "playFoeMove") {
                this.playEffects(action.payload.effect, action.payload.user, "player")
            }

            if(action.type === "foeMovePlayed") {
                setTimeout(() => {this.playFoeTurn(action.payload + 1)}, 1000)            
            }

        })
        this.currentTurnStepIndex++
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



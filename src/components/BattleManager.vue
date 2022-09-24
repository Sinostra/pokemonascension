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
import { inject } from 'vue'

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

    private startOfPlayerTurnEffects: any[] = []
    private endOfPlayerTurnEffects: any[] = []
    private endOfFoesTurnEffects: any[] = []

    private emitter: any = inject('emitter')

    get firstNotFaintedFoe(): any {
        return this.$store.getters.getFoeTeam.indexOf(this.$store.getters.getFoeTeam.find((foe) => !foe.fainted))
    }

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
            this.playFoeTurn(this.firstNotFaintedFoe)
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
        this.emitter.emit("cardIsPlaying")
        this.$store.dispatch("discardCurrentlySelectedCard")

        setTimeout(() => {
            this.$store.dispatch("spendEnergy", this.cardBeingPlayed['cost'])
            this.playEffects(this.cardBeingPlayed.effect, "player", targetIndex)
        }, 0)
    }

    private playEffects(effects: any, user: number | string | null, target: number | string | null, inInterval: boolean = false) {

        let damageTime = 1;
    
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
                user,
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

        if(effects['addToStartTurn']) {
            this.startOfPlayerTurnEffects.push(effects['addToStartTurn'])
        }


        //Gestion de la fin de l'effet
        if(!effects['draw'] && (!effects['damageTimes'] || effects['damageTimes'] <= 1) && !inInterval) {
            setTimeout(() => {
                this.effectEndCallBack(user)
            }, 500)
        }
        else if(effects['damageTimes']) {
            const repeatedEffects = {
                damage: effects['damage'],
                type: effects['type'],
                ignoreBlock: effects['ignoreBlock'],
                selfDamage: effects['selfDamage'],
            }
            const attackInterval = setInterval(() => {
                damageTime++
                this.playEffects(repeatedEffects, user, target, true)
                if(damageTime  >= effects['damageTimes']) {
                    clearInterval(attackInterval)
                    setTimeout(() => {
                        this.effectEndCallBack(user)
                    }, 500)
                } 
            }, 500)
        }
    }

    private effectEndCallBack(user?) {
        if(this.turnSteps[this.currentTurnStepIndex] === "playerTurn") {
            this.$store.dispatch("cardDonePlayed")
        }

        if(this.turnSteps[this.currentTurnStepIndex] === "foesTurn") {

            const nextIndex = this.$store.getters.getFoeTeam.indexOf(this.$store.getters.getFoeTeam.find((foe) => !foe.fainted && this.$store.getters.getFoeTeam.indexOf(foe) > user))
            const nextFoeToPlay = nextIndex > 0 ? nextIndex : this.$store.getters.getFoeTeam.length
            setTimeout(() => {
                this.playFoeTurn(nextFoeToPlay)
            }, 1000)
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

            if(action.type === "foePokemonHasBeenClicked") {
                if(this.$store.state.cards.dataCards[this.$store.getters.selectedCard]['target']) {
                    this.playCard(this.$store.getters.selectedCard, action.payload)
                }
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

            if(action.type === "setFoeFainted") {
                setTimeout(() => {
                    if(this.$store.getters.getFoeTeam.filter((foe) => !foe.fainted).length === 0) {
                        this.currentTurnStepIndex = -1
                        // this.$store.dispatch("stopBattle")
                        this.$store.dispatch("setFoes", [])
                        this.$store.dispatch("setFoes", this.$store.state.allFoes.dataFoes[1])

                        setTimeout(() => {
                            this.$store.dispatch("setFoes", this.$store.state.allFoes.dataFoes[1])
                            this.$store.dispatch("refreshFoes")
                            this.currentTurnStepIndex = 0
                        }, 1000)
                    }
                }, 0)
                
                
            }

            if(action.type === "changeActivePokemonHealth" && action.payload === 0) {
                this.currentTurnStepIndex = -1
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



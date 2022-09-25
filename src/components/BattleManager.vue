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
            this.emitter.emit("playerTurn")
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
        this.$store.commit("startNewTurn")
        this.emitter.emit("startNewTurn")
        this.$store.commit("setEnergy", this.energyPerTurn)
        this.emitter.emit("cardToBeDrawn", this.cardsBeginningTurn)
    }

    private playCard(cardId: string, targetIndex: number | null) {
        this.cardBeingPlayed = this.$store.state.cards.dataCards[cardId]
        this.emitter.emit("cardIsPlaying")
        this.emitter.emit("discardCurrentlySelectedCard")
        this.$store.commit("spendEnergy", this.cardBeingPlayed['cost'])
        this.playEffects(this.cardBeingPlayed.effect, "player", targetIndex)
    }

    private playEffects(effects: any, user: number | string | null, target: number | string | null, inInterval: boolean = false) {

        let damageTime = 1;
    
        if(effects['damage']) {
            let damage = user === "player" ? effects['damage'] + this.$store.state.battle.playerAttack : effects['damage']
            damage < 0 ? 0 : damage
            if(effects['damageAOE']) {
                this.emitter.emit("damageAllFoes", {
                    damage,
                    type: effects['type'],
                    ignoreBlock: effects['ignoreBlock'],
                })
            }

            else {
                this.emitter.emit("damage", {
                    damage,
                    type: effects['type'],
                    ignoreBlock: effects['ignoreBlock'],
                    user,
                    target
                })
            } 
        }

        if(effects['selfDamage']) {
            this.emitter.emit("damage", {
                damage: effects['selfDamage'],
                type: null,
                ignoreBlock: true,
                target: user
            })
        }

        if(effects['selfHeal']) {
            this.emitter.emit("heal", {
                amount: effects['selfHeal'],
                user
            })
        }

        if(effects['block']) {
            let amount = user === "player" ? effects['block'] + this.$store.state.battle.playerDefense : effects['block']
            amount < 0 ? 0 : amount
            this.emitter.emit("gainBlock", {
                amount,
                user
            })
        }

        if(effects['buffSelfAttack']) {
            if(user === "player") this.$store.commit("buffPlayerAttack", effects['buffSelfAttack'])
            else this.emitter.emit("buffFoeAttack", {user, amount: effects['buffSelfAttack']})
        }

        if(effects['buffSelfDefense']) {
            if(user === "player") this.$store.commit("buffPlayerDefense", effects['buffSelfDefense'])
            else this.emitter.emit("buffFoeDefense", {user, amount: effects['buffSelfDefense']})
        }

        if(effects['debuffAttack']) {
            if(user !== "player") this.$store.commit("deBuffPlayerAttack", effects['debuffAttack'])
            else this.emitter.emit("deBuffFoeAttack", {user, amount: effects['debuffAttack']})
        }

        if(effects['debuffDefense']) {
            if(user !== "player") this.$store.commit("deBuffPlayerDefense", effects['debuffDefense'])
            else this.emitter.emit("deBuffFoeDefense", {user, amount: effects['debuffDefense']})
        }

        if(effects['energy']) {
            this.$store.commit("getEnergy", effects['energy'])
        }

        if(effects['draw']) {
            this.emitter.emit("cardToBeDrawn", effects['draw'])
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
            this.emitter.emit("cardDonePlayed")
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
            this.emitter.emit("foeTurn", index)
        }

        else {
            this.currentTurnStepIndex++
        }
    }

    private onPlayCurrentlySelectedCard(payload) {
        this.playCard(this.$store.getters.selectedCard, payload)
    }

    private onFoePokemonHasBeenClicked(payload) {
        if(this.$store.state.cards.dataCards[this.$store.getters.selectedCard]['target']) {
            this.playCard(this.$store.getters.selectedCard, payload)
        }
    }

    private onDrawIsDone() {
        if(this.turnSteps[this.currentTurnStepIndex] === "playerDraw") {
            this.currentTurnStepIndex++
        }

        else {
            this.effectEndCallBack()
        }
    }

    private onEndPlayerTurn() {
        setTimeout(() => {this.currentTurnStepIndex++}, 1000)
    }

    private onPlayFoeMove(payload) {
        this.playEffects(payload.effect, payload.user, "player")
    }

    private onSetFoeFainted() {
        if(!this.$store.getters.getNotFaintedFoes.length) {
            setTimeout(() => {
                this.$store.commit("setFoes", [])
                this.$store.commit("stopBattle")
                // this.$store.commit("setFoes", this.$store.state.allFoes.dataFoes[1])
            }, 1000)
        }
    }

    public mounted() {

        this.emitter.on("playCurrentlySelectedCard", this.onPlayCurrentlySelectedCard)
        this.emitter.on("foePokemonHasBeenClicked", this.onFoePokemonHasBeenClicked)
        this.emitter.on("drawIsDone", this.onDrawIsDone)
        this.emitter.on("endPlayerTurn", this.onEndPlayerTurn)
        this.emitter.on("playFoeMove", this.onPlayFoeMove)
        this.emitter.on("setFoeFainted", this.onSetFoeFainted)

        this.currentTurnStepIndex++
    }

    public beforeUnmount() {
        this.emitter.off("playCurrentlySelectedCard", this.onPlayCurrentlySelectedCard)
        this.emitter.off("foePokemonHasBeenClicked", this.onFoePokemonHasBeenClicked)
        this.emitter.off("drawIsDone", this.onDrawIsDone)
        this.emitter.off("endPlayerTurn", this.onEndPlayerTurn)
        this.emitter.off("playFoeMove", this.onPlayFoeMove)
        this.emitter.off("setFoeFainted", this.onSetFoeFainted)
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



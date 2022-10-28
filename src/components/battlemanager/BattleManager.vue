<template>
    <div class="battlemanager">
        <BattleScene/>
        <BattleInterface/>
    </div>
</template>

<script lang="ts">
import BattleScene from './BattleScene.vue'
import BattleInterface from './BattleInterface.vue'
import { Options, Vue } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { inject } from 'vue'
import { EffectContainer } from "../../engine/EffectContainer"
import cloneDeep from "lodash.clonedeep"

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
        this.emitter.emit("draw", {draw :this.cardsBeginningTurn})
    }

    private playCard(cardId: string, targetIndex: number | null) {
        this.cardBeingPlayed = this.$store.state.cards.dataCards[cardId]
        this.emitter.emit("cardIsPlaying")
        this.emitter.emit("discardCurrentlySelectedCard")
        this.$store.commit("spendEnergy", this.cardBeingPlayed['cost'])
        setTimeout(() => {
            this.playEffects(this.cardBeingPlayed.effect, "player", targetIndex)
        }, 1)
        // this.playEffects(this.cardBeingPlayed.effect, "player", targetIndex)
    }

    private playEffects(effects: any, user: number | string | null, target: number | string | null) {
        const cardEffect = this.applyModifiers(effects, user, target)
        const effect = new EffectContainer[cardEffect.name]({user, target, type: cardEffect.type, ...cardEffect.params}, this.emitter)
        effect.playEffect().then(() => this.effectEndCallBack(user))
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

    private applyModifiers(effect, user, target) {
        const cardEffect = cloneDeep(effect)
        if(cardEffect.name !== "MultiEffect") {
            let resolvedModifiers = 0
            const attackStat = 'attack'
            const defenseStat = 'defense'
            // const attackStat = reversedStats ? 'defense' : 'attack'
            // const defenseStat = reversedStats ? 'attack' : 'defense'
            if(cardEffect.params.modifiers) {
                resolvedModifiers = cardEffect.params.modifiers.map((modifier) => {
                    if(user === "player") {
                        switch(modifier) {
                            case 'userAttack': return this.$store.state.battle.playerStats[attackStat]
                            case 'userDefense': return this.$store.state.battle.playerStats[defenseStat]
                            case 'targetAttack': return this.$store.getters.getFoeTeam[target as number]['stats'][attackStat]
                            case 'targetDefense': return this.$store.getters.getFoeTeam[target as number]['stats'][defenseStat]
                        }
                    }
                    else {
                        switch(modifier) {
                            case 'userAttack': return this.$store.getters.getFoeTeam[user as number]['stats'][attackStat]
                            case 'userDefense': return this.$store.getters.getFoeTeam[user as number]['stats'][defenseStat]
                            case 'targetAttack': return this.$store.state.battle.playerStats[attackStat]
                            case 'targetDefense': return this.$store.state.battle.playerStats[defenseStat]
                        }
                    }
                    
                }).reduce((prev, next) => prev + next)
            }

            cardEffect.params.value += resolvedModifiers
        }

        else {
            cardEffect.params = cardEffect.params.map((subEffect) => {
                return this.applyModifiers(subEffect, user, target)
            })
        }
        
        return cardEffect
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
                this.$store.commit("displayBattleRewards")
            }, 1000)
        }
    }

    private onSetPlayerFainted() {
        if(!this.$store.getters.getNotFaintedPokemon.length) {
            this.currentTurnStepIndex = -1;
            setTimeout(() => {
                this.$store.commit("setFoes", [])
                this.$store.commit("stopBattle")
                this.$store.commit("playerLost")
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
        this.emitter.on("setPlayerFainted", this.onSetPlayerFainted)

        this.currentTurnStepIndex++
    }

    public beforeUnmount() {
        this.emitter.off("playCurrentlySelectedCard", this.onPlayCurrentlySelectedCard)
        this.emitter.off("foePokemonHasBeenClicked", this.onFoePokemonHasBeenClicked)
        this.emitter.off("drawIsDone", this.onDrawIsDone)
        this.emitter.off("endPlayerTurn", this.onEndPlayerTurn)
        this.emitter.off("playFoeMove", this.onPlayFoeMove)
        this.emitter.off("setFoeFainted", this.onSetFoeFainted)
        this.emitter.off("setPlayerFainted", this.onSetPlayerFainted)
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



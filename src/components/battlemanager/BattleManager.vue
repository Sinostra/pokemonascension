<template>
    <div class="battlemanager">
        <BattleInterface/>
    </div>
</template>

<script lang="ts">
import BattleInterface from './BattleInterface.vue'
import { Options, Vue } from 'vue-class-component'
import { inject } from 'vue'
import { EffectContainer } from "@/engine/EffectContainer"
import applyModifiers from "@/engine/ApplyModifiers"
import cloneDeep from "lodash.clonedeep"

@Options({
    name: "BattleManager",
    components: {
        BattleInterface
    }
})

export default class BattleManager extends Vue {
    private cardBeingPlayed: any = null
    private cardsBeginningTurn: number = 5
    private energyPerTurn = 3

    private foePlayedTurn: number[] = []

    private countDownEffects: any[] = [
        // {
        //     countDownTimer: 0,
        //     effect: {
        //         name: "DrawEffect",
        //         user: "player",
        //         target: null,
        //         type: null,
        //         params: {
        //             value: this.cardsBeginningTurn,
        //         }
        //     }
        // }
    ]

    private playerDraw: any[] = [
        {
            name: "DrawEffect",
            type: null,
            // remainingTurns: 2,
            params: {
                value: this.cardsBeginningTurn,
            }
        }
    ]
    private startOfPlayerTurnEffects: any[] = []
    private endOfPlayerTurnEffects: any[] = []
    private endOfFoesTurnEffects: any[] = []

    private emitter: any = inject('emitter')

    private playArrayEffects(array): Promise<any[]> {
        if(!array.length) {
            return new Promise((resolve) => {
                resolve(array)
            })
        }
        const resolvedDrawArray = this.manageDrawEffects(cloneDeep(array))
        return new Promise((resolve) => {
            Promise.all(resolvedDrawArray.map((effect) => {
                const user = effect.user ? effect.user : null
                const target = effect.target ? effect.target : null
                return this.playEffects(effect, user, target)
            })).then(() => {
                const resolvedPassedArray = this.manageRemainingTurns(array)
                resolve(resolvedPassedArray)
            })
        })
    }

    private manageRemainingTurns(array): any[] {
        const resolvedArray = array.reduce((recipient, current) => {
            if(!current.remainingTurns) {
                recipient.push(current)
            }
            else {
                current.remainingTurns--
                if(current.remainingTurns > 0) {
                    recipient.push(current)
                }
            }
            return recipient
        }, [])
        return resolvedArray
    }

    //Sert à piocher toutes les cartes dans un seul effet
    private manageDrawEffects(array) {
        let drawEffects = 0
        const resolvedArray = array.reduce((recipient, effect) => {
            if(effect.name !== "MultiEffect") {
                if(effect.name === "DrawEffect") {
                    drawEffects += effect.params.value
                    effect.params.value = 0
                }
            }
            else {
                effect.params = effect.params.map((subEffect) => {
                    if(subEffect.name === "DrawEffect") {
                        drawEffects += subEffect.params.value
                        subEffect.params.value = 0
                    }
                    return subEffect
                })
            }

            recipient.push(effect)
            
            return recipient
        }, [])

        resolvedArray.push({name: "DrawEffect", type: null, params: {value: drawEffects}})
        return resolvedArray
    }

    private manageCountDownEffects(array): Promise<any[]> {
        return new Promise((resolve) => {

            const effectsToPlay = array.filter((effect) => effect.countDownTimer === 1).map((countDownEffect) => countDownEffect.effect)
            this.playArrayEffects(effectsToPlay).then(() => {
                const resolvedArray = array.reduce((recipient, currentEffect) => {
                    if(currentEffect.countDownTimer > 1) {
                        currentEffect.countDownTimer--
                        recipient.push(currentEffect)
                    }
                    return recipient
                }, [])
                resolve(resolvedArray)
            })
        })
    }

    /* Séquence d'un tour : Début du tour => pioche du joueur => effets de début de tour => le joueur joue son tour => effets de fin de tour => tour des ennemis */

    private startPlayerTurn() {
        this.$store.commit("setEnergy", this.energyPerTurn)
        this.emitter.emit("playerTurn")
    }

    private playCard(cardId: string, targetIndex: number | null) {
        this.cardBeingPlayed = this.$store.state.cards.dataCards[cardId]
        this.emitter.emit("cardIsPlaying")
        this.emitter.emit("discardCurrentlySelectedCard")
        this.$store.commit("spendEnergy", this.cardBeingPlayed['cost'])
        setTimeout(() => {
            this.playEffects(this.cardBeingPlayed.effect, "player", targetIndex)
        }, 1)   
    }

    private playEffects(effects: any, user: number | string | null, cardTarget: number | string | null): Promise<void> {
        let target = cardTarget
        if(effects.cardAOE) {
            target = "allFoes"
        }
        return new Promise((resolve) => {
            const cardEffect = applyModifiers(effects, user, target, this.$store)
            const playAttackAnim = cardEffect.playAttackAnim ? true : false
            const effect = new EffectContainer[cardEffect.name]({user, target, type: cardEffect.type, playAttackAnim, ...cardEffect.params}, this.emitter)
            effect.playEffect().then(() => {
                this.emitter.emit("cardDonePlayed")
                resolve()
            })
        })
    }

    private getNotFaintedFoesIndexes() {
        return this.$store.getters.getFoeTeam.reduce((recipient, foe) => {
            if(!foe.fainted) {
                recipient.push(this.$store.getters.getFoeTeam.indexOf(foe))
            }
            return recipient
        }, [])
    }

    private startNewTurn() {
        this.$store.commit("startNewTurn")
        this.emitter.emit("startNewTurn")
        this.manageCountDownEffects(this.countDownEffects).then((array) => {
            this.countDownEffects = array
        }).then(() => {
            this.playArrayEffects(this.playerDraw).then((array) => {
                this.playerDraw = array
        }).then(() => {
            this.playArrayEffects(this.startOfPlayerTurnEffects).then((array) => {
                this.startOfPlayerTurnEffects = array
            })
        }).then(() => {
            this.startPlayerTurn()
        })
        })
        
    }

    private playNextFoeTurn() {
        setTimeout(() => {
            const foesToPlay = this.getNotFaintedFoesIndexes().filter((foeIndex) => !this.foePlayedTurn.includes(foeIndex))
            if(foesToPlay.length) {
                this.foePlayedTurn.push(foesToPlay[0])
                this.emitter.emit("foeTurn", foesToPlay[0])
            }
            else {
                this.playArrayEffects(this.endOfFoesTurnEffects).then((array) => {
                    this.endOfFoesTurnEffects = array
                }).then(() => {
                    this.foePlayedTurn = []
                    this.startNewTurn()
                })
            }
        }, 1000)
    }

    private checkBattleEnded() {
        if(!this.$store.getters.getNotFaintedFoes.length || !this.$store.getters.getNotFaintedPokemon.length) {
            setTimeout(() => {
                this.$store.commit("setFoes", [])
                this.$store.commit("stopBattle")
            }, 1000)
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

    private onEndPlayerTurn() {
        this.playArrayEffects(this.endOfPlayerTurnEffects).then((array) => {
            this.endOfPlayerTurnEffects = array
        }).then(() => {
            this.playNextFoeTurn()
        })
    }

    private onAddToTurn(payload) {
        let targetArray: any[] = []
        switch(payload.step) {
            case 'startPlayerTurn':
                targetArray = this.startOfPlayerTurnEffects
                break;
            case 'endPlayerTurn':
                targetArray = this.endOfPlayerTurnEffects
                break;
            case 'endFoesTurn':
                targetArray = this.endOfFoesTurnEffects
                break;
            case 'countDown':
                targetArray = this.countDownEffects
                break;
        }
        targetArray.push(payload.effectToAdd)
    }

    private onPlayFoeMove(payload) {
        this.playEffects(payload.effect, payload.user, "player").then(() => {
            this.playNextFoeTurn()
        })
    }


    public mounted() {
        this.emitter.on("playCurrentlySelectedCard", this.onPlayCurrentlySelectedCard)
        this.emitter.on("foePokemonHasBeenClicked", this.onFoePokemonHasBeenClicked)
        this.emitter.on("endPlayerTurn", this.onEndPlayerTurn)
        this.emitter.on("addToTurn", this.onAddToTurn)
        this.emitter.on("playFoeMove", this.onPlayFoeMove)
        this.emitter.on("fainted", this.checkBattleEnded)

        this.startNewTurn()
    }

    public beforeUnmount() {
        this.emitter.off("playCurrentlySelectedCard", this.onPlayCurrentlySelectedCard)
        this.emitter.off("foePokemonHasBeenClicked", this.onFoePokemonHasBeenClicked)
        this.emitter.off("endPlayerTurn", this.onEndPlayerTurn)
        this.emitter.off("addToTurn", this.onAddToTurn)
        this.emitter.off("playFoeMove", this.onPlayFoeMove)
        this.emitter.off("fainted", this.checkBattleEnded)
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



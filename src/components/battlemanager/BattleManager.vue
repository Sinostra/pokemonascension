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

    private foePlayedTurn: number[] = []

    private playerDraw: any[] = [{
        name: "DrawEffect",
        type: null,
        // remainingTurns: 2,
        params: {
            draw: this.cardsBeginningTurn,
        }
    }]
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
        const effects = array.map((effect) => {
            return new EffectContainer[effect.name]({user: effect.user, target: effect.target, type: effect.type, ...effect.params}, this.emitter)
        })
        return new Promise((resolve) => {
            Promise.all(effects.map((effect) => effect.playEffect())).then(() => {
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

    private playEffects(effects: any, user: number | string | null, target: number | string | null): Promise<void> {
        return new Promise((resolve) => {
            const cardEffect = this.applyModifiers(effects, user, target)
            const effect = new EffectContainer[cardEffect.name]({user, target, type: cardEffect.type, ...cardEffect.params}, this.emitter)
            effect.playEffect().then(() => {
                this.emitter.emit("cardDonePlayed")
                // if(cardEffect.name === "AttackEffect") {

                // }
                resolve()
            })
        })
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
        this.playArrayEffects(this.playerDraw).then((array) => {
            this.playerDraw = array
        }).then(() => {
            this.playArrayEffects(this.startOfPlayerTurnEffects).then((array) => {
                this.startOfPlayerTurnEffects = array
            })
        }).then(() => {
            this.startPlayerTurn()
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

    private onPlayFoeMove(payload) {
        this.playEffects(payload.effect, payload.user, "player").then(() => {
            this.playNextFoeTurn()
        })
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
        this.emitter.on("endPlayerTurn", this.onEndPlayerTurn)
        this.emitter.on("playFoeMove", this.onPlayFoeMove)
        this.emitter.on("setFoeFainted", this.onSetFoeFainted)
        this.emitter.on("setPlayerFainted", this.onSetPlayerFainted)

        this.startNewTurn()
    }

    public beforeUnmount() {
        this.emitter.off("playCurrentlySelectedCard", this.onPlayCurrentlySelectedCard)
        this.emitter.off("foePokemonHasBeenClicked", this.onFoePokemonHasBeenClicked)
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



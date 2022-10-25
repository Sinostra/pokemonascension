<template>
    <div v-if="nextMove && nextMove['params']" class="intent">
        <div v-if="attackIntentValue" class="intent-category damage">
            <div class="text-wrapper">
                <span v-if="nextMoveDamageModifier < 1" :class="damageMoveClass">{{ Math.floor(attackIntentValue)}}</span>
                <span v-else :class="damageMoveClass">{{ Math.ceil(attackIntentValue)}}</span>
                <span v-if="nextMove['params']['damageTimes']">x{{nextMove['params']['damageTimes']}}</span>
            </div>
            <div class="img-wrapper" :class="mouseOver ? '' : 'hidden'">
                <img :src="getTpyeIcon(nextMove['type'])" class="type-icon">
            </div>
        </div>
        <div v-if="blockIntentValue" class="intent-category block">
            <div class="img-wrapper">
                <div class="block-text-wrapper">{{blockIntentValue}}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import getTypeMatchup from "@/engine/TypeMatchup";

@Options({
  name: "Intents",
  props: {
    nextMove: Object,
    mouseOver: Boolean,
    stats: Object,
  }
})

export default class Intents extends Vue {

    public nextMove!: any
    public mouseOver!: boolean
    private stats!: any

    get nextMoveDamageModifier(): number {
        const playerActivePokemonTypes = this.$store.state.pokedex.constantDex[this.$store.state.playerTeam.team[this.$store.getters.getActiveIndex]['id']]['type']
        if(this.nextMove['type']) {
            return getTypeMatchup(this.nextMove['type'], playerActivePokemonTypes) 
        }
        else return 1
    }

    get damageMoveClass(): string {
        let moveClass = ''
        if(this.nextMoveDamageModifier > 1) moveClass = 'super-effective'
        else if(this.nextMoveDamageModifier < 1) moveClass = 'not-very-effective'
        return moveClass
    }

    get attackIntentValue(): number {
        if(this.nextMove.name !== "AttackEffect") {
            return 0
        }
        else {
            let resolvedModifiers = 0
            const attackStat = 'attack'
            const defenseStat = 'defense'
            // const attackStat = reversedStats ? 'defense' : 'attack'
            // const defenseStat = reversedStats ? 'attack' : 'defense'
            if(this.nextMove.params.modifiers) {
                resolvedModifiers = this.nextMove.params.modifiers.map((modifier) => {
                    switch(modifier) {
                        case 'userAttack': return this.stats[attackStat]
                        case 'userDefense': return this.stats[defenseStat]
                        case 'targetAttack': return this.$store.state.battle.playerStats[attackStat]
                        case 'targetDefense': return this.$store.state.battle.playerStats[defenseStat]
                    }
                }).reduce((prev, next) => prev + next)
            }

            const damageWithModifiers = this.nextMove.params.value + resolvedModifiers
            return damageWithModifiers * this.nextMoveDamageModifier
        }
    }

    get blockIntentValue(): number {
        if(this.nextMove.name !== "BlockEfffect") {
            return 0
        }
        else {
            let resolvedModifiers = 0
            const attackStat = 'attack'
            const defenseStat = 'defense'
            // const attackStat = reversedStats ? 'defense' : 'attack'
            // const defenseStat = reversedStats ? 'attack' : 'defense'
            if(this.nextMove.params.modifiers) {
                resolvedModifiers = this.nextMove.params.modifiers.map((modifier) => {
                    switch(modifier) {
                        case 'userAttack': return this.stats[attackStat]
                        case 'userDefense': return this.stats[defenseStat]
                        case 'targetAttack': return this.$store.state.battle.playerStats[attackStat]
                        case 'targetDefense': return this.$store.state.battle.playerStats[defenseStat]
                    }
                }).reduce((prev, next) => prev + next)
            }

            return this.nextMove.params.value + resolvedModifiers
        }
    }

    public getTpyeIcon(type) {
        return require(`@/assets/img/types/${type}.png`)
    }
}
</script>

<style lang="scss" scoped>
@import '../style/intents.scss';
</style>
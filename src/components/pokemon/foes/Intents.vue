<template>
    <div v-if="nextMove && nextMove['params']" class="intent" :style="getFontSize(1)">
        <div v-if="attackIntentValue" class="intent-category damage">
            <div class="text-wrapper">
                <span v-if="nextMoveDamageModifier < 1" :class="damageMoveClass">{{ Math.floor(attackIntentValue)}}</span>
                <span v-else :class="damageMoveClass">{{ Math.ceil(attackIntentValue)}}</span>
                <span v-if="multiAttackAmount">x{{multiAttackAmount}}</span>
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
import checkEffectContent from "@/engine/CheckEffectContent"
import applyModifiers from "@/engine/ApplyModifiers"
import pokedex from "@/store/constantData/pokedex"

@Options({
  name: "Intents",
  props: {
    nextMove: Object,
    mouseOver: Boolean,
    index: Number
  }
})

export default class Intents extends Vue {

    public nextMove!: any
    public mouseOver!: boolean
    public index!: number

    get nextMoveDamageModifier(): number {
        const playerActivePokemonTypes = pokedex[this.$store.state.playerTeam.team[this.$store.getters.getActiveIndex]['id']]['type']
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
        let foundEffect = checkEffectContent(this.nextMove, "AttackEffect")
        if(!foundEffect) {
            foundEffect = checkEffectContent(this.nextMove, "MultiAttackEffect")
        }
        if(!foundEffect) {
            return 0
        }
        else {
            const damageWithModifiers = applyModifiers(foundEffect, this.index, "player", this.$store).params.value
            return damageWithModifiers * this.nextMoveDamageModifier
        }
    }

    get blockIntentValue(): number {
        const foundEffect = checkEffectContent(this.nextMove, "BlockEffect")
        if(!foundEffect) {
            return 0
        }
        else {
            return applyModifiers(foundEffect, this.index, "player", this.$store).params.value
        }
    }

    get multiAttackAmount(): number {
        const foundEffect = checkEffectContent(this.nextMove, "MultiAttackEffect")
        if(!foundEffect) {
            return 0
        }
        else {
            return foundEffect.params.damageTimes
        }
    }

    public getTpyeIcon(type) {
        return require(`@/assets/img/types/${type}.png`)
    }

    public getFontSize(multiplier = 1): string {
        return `font-size: ${(this.$store.getters.baseFontSize) * multiplier}px;`
    }
}
</script>

<style lang="scss" scoped>
@import '../style/intents.scss';
</style>
<template>
    <div v-if="nextMove && nextMove['params']" class="intent">
        <div v-if="attackIntent" class="intent-category damage">
            <div class="text-wrapper">
                <span v-if="nextMoveDamageModifier < 1" :class="damageMoveClass">{{ Math.floor(nextMove['params']['value'] * nextMoveDamageModifier)}}</span>
                <span v-else :class="damageMoveClass">{{ Math.ceil(nextMove['params']['value'] * nextMoveDamageModifier)}}</span>
                <span v-if="nextMove['params']['damageTimes']">x{{nextMove['params']['damageTimes']}}</span>
            </div>
            <div class="img-wrapper" :class="mouseOver ? '' : 'hidden'">
                <img :src="getTpyeIcon(nextMove['type'])" class="type-icon">
            </div>
        </div>
        <div v-if="blockIntent" class="intent-category block">
            <div class="img-wrapper">
                <div class="block-text-wrapper">{{nextMove['params']['value']}}</div>
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
  }
})

export default class Intents extends Vue {

    public nextMove!: any
    public mouseOver!: boolean

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

    get attackIntent() {
        return this.nextMove.name === "AttackEffect"
    }

    get blockIntent() {
        return this.nextMove.name === "BlockEfffect"
    }

    public getTpyeIcon(type) {
        return require(`@/assets/img/types/${type}.png`)
    }
}
</script>

<style lang="scss" scoped>
@import '../style/intents.scss';
</style>
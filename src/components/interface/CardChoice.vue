<template>
    <div v-if="!hasChosenCard" class="proposed-cards-wrapper">
        <div v-for="(card, index) in proposedCards" :key="index" class="proposed-card" @click="onCardClick(card)">
            <DisplayCard :id="card"></DisplayCard>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DisplayCard from "../card/DisplayCard.vue"
import pokedex from "@/constantData/pokedex"
import cloneDeep from "lodash.clonedeep"

@Options({
    name: "CardChoice",
    components: {
        DisplayCard
    }
})
export default class CardChoice extends Vue {

    public proposedCardsAmount = 3

    public proposedCards: string[] = []

    public hasChosenCard = false

    public onCardClick(card) {
        this.$store.commit("addCardToPokemon", {pokemonIndex: this.$store.getters.getActiveIndex, cardId: card})
        this.hasChosenCard = true
    }

    public mounted() {
        const cardChoice = cloneDeep(pokedex[this.$store.getters.getActivePokemon.id]['compatibleCards'])
        cardChoice.sort(() => {
            if(Math.random() > 0.5) return -1
            else return 1
        })

        for(let i = 0; i < this.proposedCardsAmount; i++) {
            this.proposedCards.push(cardChoice.shift())
        }
    }
}
</script>
<style lang="scss" scoped>
@import './style/cardChoice.scss';
</style>
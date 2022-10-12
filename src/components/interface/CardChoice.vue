<template>
    <div class="proposed-cards-wrapper">
        <div v-for="(card, index) in proposedCards" :key="index" class="proposed-card">
            <DisplayCard :id="card"></DisplayCard>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DisplayCard from "../card/DisplayCard.vue"
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

    public mounted() {
        const cardChoice = cloneDeep(this.$store.getters.getDex[this.$store.getters.getActivePokemon.id]['compatibleCards'])
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
<template>
    <div class="hand" :class="isCardBeingPlayed ? 'lockedHand' : ''">
        <Card v-for="(card, index) in content"
            :key="index"
            :id="card"
            :state="'drawn'"
            :style="getCardPosition(index)"
            @cardClicked="onClick(index)"
        >
        </Card>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Card from '../card/Card.vue'

@Options({
    name: "Hand",
    components: {
        Card
    },
    props: {
        content: Array,
        selectedCardIndex: Number
    }
})
export default class Hand extends Vue {

    private content!: string[]
    private selectedCardIndex!: number | null

    private isCardBeingPlayed: boolean = false

    private onClick(cardIndex) {
        this.$emit("onCardClicked", cardIndex)
    }

    private getCardPosition(index: number): string {

        const selectedCardStyle = 'transform : rotate(0deg) scale(1.2); left: 20%; bottom: 153%; filter: none;'

        if(index === this.selectedCardIndex) {
            return selectedCardStyle
        }

        const handSize = this.content.length
        const evenHand = handSize % 2 == 0

        //Une rotation de carte
        const baseRotate =  2

        //L'endroit où la carte du milieu se positionne
        const baseBottom = -3

        //L'endroit où la première carte se positionne
        const baseLeft = 50 - (handSize * 3)

        //L'écart horizontal entre deux cartes
        const leftShift = 5

        //Détermine le milieu
        let lastIndexToRotate = (Math.floor(handSize / 2))
        
        //Décale le mileu dans une main paire
        if(evenHand) lastIndexToRotate -= 1

        //Où on est par rapport à la main entière
        let difference = lastIndexToRotate - index;

        //Sert à mettre en place une symétrie entre les différences en cas de main paire : (2,1,0,0,-1,-2) au lieu de (2,1,0,-1,-2,-3)
        if(evenHand && difference < 0) {
            difference += 1
        }

        //Rotation finale calculée en fonction de la différence (donc la position par rapport à la carte du milieu, plus on en est loin, plus la rotation sera importante)
        let finalRotate = baseRotate * difference

        //Permet de ne pas avoir de rotation à 0 dans une main paire
        if(evenHand) {
            if(index <= lastIndexToRotate) finalRotate += baseRotate
            else finalRotate -= baseRotate
        }

        finalRotate *= -1

        //L'écart vertical entre deux cartes
        const bottomShift = 1.5 * Math.abs(difference)

        const finalBottom = baseBottom - (bottomShift * Math.abs(difference))

        //On ajoute une rotation à toutes les cartes après celle du milieu quand le nombre de cartes en main est pair, pour ne pas avoir de carte avec une rotation à 0
        if(handSize % 2 == 0 && index > lastIndexToRotate) {
            // finalRotate -= baseRotate
        }

        const finalLeft = baseLeft + index * leftShift

        return `transform : rotate(${finalRotate}deg); left: ${finalLeft}%; bottom: ${finalBottom}%;`
    }

    public mounted() {

        this.$store.subscribeAction((action) => {
            if(action.type === "cardIsPlaying") {
                this.isCardBeingPlayed = true
            }

            if(action.type === "cardDonePlayed") {
                this.isCardBeingPlayed = false
            }
        })

    }
}

</script>

<style lang="scss" scoped>
@import './style/hand.scss';
</style>
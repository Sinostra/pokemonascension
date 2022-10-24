<template>
    <div class="hand" :class="isCardBeingPlayed ? 'lockedHand' : ''">
        <Card v-for="(card, index) in content"
            :key="index"
            :id="card"
            :state="'drawn'"
            :style="getCardPosition(index)"
            @dragCard="startDrag(index)"
            @dragEnd="endDrag()"
        >
        </Card>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Card from '../card/Card.vue'
import { inject } from 'vue'

@Options({
    name: "Hand",
    components: {
        Card
    },
    props: {
        content: Array,
        draggedCardIndex: Number,
    }
})
export default class Hand extends Vue {

    public content!: string[]
    public draggedCardIndex!: number | null

    public isCardBeingPlayed: boolean = false

    private offSetCardX = 9
    private offSetCardY = 100
    private cardXmultiplier = 1.1
    private cardYmultiplier = 10/3

    private emitter: any = inject('emitter')

    public getCardPosition(index: number): string {

        const selectedCardStyle = 'transform : rotate(0deg) scale(1.2); left: 20%; bottom: 186%; filter: none;'
        const currentCardYPosition = ((this.$store.getters.mouseCoordinates.y/window.innerHeight * 100) - this.offSetCardY) * this.cardYmultiplier

        if(index === this.draggedCardIndex && currentCardYPosition <= 120 && this.$store.state.cards.dataCards[this.content[this.draggedCardIndex]]["target"]) {
            return selectedCardStyle
        }

        if(index === this.draggedCardIndex) {
            const xPercent  = ((this.$store.getters.mouseCoordinates.x/window.innerWidth * 100) - this.offSetCardX) * this.cardXmultiplier
            const yPercent  = ((this.$store.getters.mouseCoordinates.y/window.innerHeight * 100) - this.offSetCardY) * this.cardYmultiplier
            return `left: ${xPercent}%; top: ${yPercent}%; transition: none`
        }

        const handSize = this.content.length
        const evenHand = handSize % 2 == 0

        //Une rotation de carte
        const baseRotate =  2

        //L'endroit où la carte du milieu se positionne
        const baseBottom = 35

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

    public startDrag(index) {
        this.$emit("onCardDragged", index)
    }

    public endDrag() {
        const currentCardYPosition = ((this.$store.getters.mouseCoordinates.y/window.innerHeight * 100) - this.offSetCardY) * this.cardYmultiplier
        if(currentCardYPosition > -120) {
            this.$emit("onCardDragged", null)
            return
        }
        
        if(this.draggedCardIndex !== null && !this.$store.state.cards.dataCards[this.content[this.draggedCardIndex]]["target"]) {
            this.emitter.emit("playCurrentlySelectedCard", null)
            return
        }
        // else this.$emit("onCardDragged", null)
    }

    private onCardPlaying() {
        this.isCardBeingPlayed = true
    }

    private oncardDonePlayed() {
        this.isCardBeingPlayed = false
    }

    public mounted() {
        this.emitter.on("cardIsPlaying", this.onCardPlaying)
        this.emitter.on("cardDonePlayed", this.oncardDonePlayed)
    }

    public beforeUnmount() {
        this.emitter.off("cardIsPlaying", this.onCardPlaying)
        this.emitter.off("cardDonePlayed", this.oncardDonePlayed)
    }
}

</script>

<style lang="scss" scoped>
@import './style/hand.scss';
</style>
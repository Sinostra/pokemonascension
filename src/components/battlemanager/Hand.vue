<template>
    <PlayableCard v-for="(card, index) in content"
        :key="index"
        :id="card"
        :state="'drawn'"
        :position="getCardPosition(index)"
        :class="getCardClass(index)"
        @dragCard="startDrag(index)"
    >
    </PlayableCard>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import PlayableCard from '../card/PlayableCard.vue'
import { inject } from 'vue'

@Options({
    name: "Hand",
    components: {
        PlayableCard
    },
    props: {
        content: Array,
        draggedCardIndex: Number,
        selectedCardIndex: Number,
        mouseInCardArea: Boolean
    },
    emits: {
        onCardDragged: String,
    }
})
export default class Hand extends Vue {

    public content!: string[]
    public draggedCardIndex!: number | null
    public selectedCardIndex!: number | null
    public mouseInCardArea!: boolean

    public isCardBeingPlayed: boolean = false

    private emitter: any = inject('emitter')

    public getCardPosition(index: number): string {

        if(index === this.selectedCardIndex) {
            return 'transform : rotate(0deg) scale(1.2); left: 20%; bottom: 46%; filter: none; transition: none'
        }

        if(index === this.draggedCardIndex) {
            const xPos  = this.$store.getters.mouseCoordinates.x
            const yPos  = this.$store.getters.mouseCoordinates.y
            return `left: ${xPos}px; top: ${yPos}px; transform: translate(-50%, -50%); transition: none`
        }

        const handSize = this.content.length
        const evenHand = handSize % 2 == 0

        //Une rotation de carte
        const baseRotate =  2

        //L'endroit où la carte du milieu se positionne
        const baseBottom = -2

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
        const bottomShift = 0.2 * Math.abs(difference)

        const finalBottom = baseBottom - (bottomShift * Math.abs(difference))

        //On ajoute une rotation à toutes les cartes après celle du milieu quand le nombre de cartes en main est pair, pour ne pas avoir de carte avec une rotation à 0
        if(handSize % 2 == 0 && index > lastIndexToRotate) {
            // finalRotate -= baseRotate
        }

        const finalLeft = baseLeft + index * leftShift

        return `transform : rotate(${finalRotate}deg); left: ${finalLeft}%; bottom: ${finalBottom}%;`
    }

    public getCardClass(index) {
        if(this.isCardBeingPlayed || (this.draggedCardIndex !== null && index !== this.draggedCardIndex)) {
            return 'locked'
        }
        if(index === this.draggedCardIndex) {
            let cardClass = 'draggedCard'
            if(!this.mouseInCardArea) {
                cardClass = 'draggedCard willBePlayed'
            }
            return cardClass
        }
    }

    public startDrag(index) {
        this.$emit("onCardDragged", index)
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
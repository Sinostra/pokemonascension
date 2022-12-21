import { Options, Vue } from 'vue-class-component';
import dataCard from "@/store/constantData/cards"

@Options({
    props: {
      id: String,
    }
})

export default class Card extends Vue {
    protected id!: string
    protected dataCard = dataCard

    get background() {
        return require(`@/assets/img/cards/bords/${this.dataCard[this.id]['rarity']}2.png`)
    }

    get costBackground() {
        return require(`@/assets/img/cards/bords/${this.dataCard[this.id]['rarity']}_round.png`)
    }

    get illustrationBackground(): string {
        return require(`@/assets/img/cards/illustrations/${this.id}.jpg`)
    }

    get categoryBackground() {
        return require(`@/assets/img/cards/${this.dataCard[this.id]['category']}_${this.dataCard[this.id]['rarity']}.png`)
    }

    getFontSize(multiplier = 1): string {
        return `font-size: ${(this.$store.getters.baseFontSize) * multiplier}px;`
    }

    getCategoryStyle(multiplier = 1) {
        const fontSize = this.getFontSize(multiplier)
        const background = `background-image :url(${this.categoryBackground});`
        return fontSize + background
    }
}
<template>
    <div class="being-discarded">
        <Card v-for="(card, index) in content"
            :key="index"
            :id="card"
            :state="'discardedFromSelect'"
            @discardAnimEnded="endAnim()"
        >
        </Card>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Card from '../card/Card.vue'

@Options({
    name: "DiscardManager",
    components: {
        Card
    },
    props: {
        content: Array,
    }
})
export default class DiscardManager extends Vue {

    private content!: string[]

    // private endAnim() {
    //     this.$store.dispatch("addCardToDiscardPile", this.cardsBeingDiscardedFromSelect.shift())
    // }

    public mounted() {
        this.$store.subscribeAction((action) => {
            if(action.type === "cardDonePlayed") {
                for (let i = this.content.length; i > 0; i--) {
                    this.$store.dispatch("addCardToDiscardPile", this.content.shift())
                }
            }
        })
    }
}
</script>
<style lang='scss' scoped>
.being-discarded {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 100%;
    height: 30%;
    z-index: 1;
    bottom: -3%;
}
</style>

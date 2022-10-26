<template>
    <div class="being-discarded">
        <PlayableCard v-for="(card, index) in content"
            :key="index"
            :id="card"
            :state="'discardedFromHand'"
            :style="'transform : scale(0)'"
        >
        </PlayableCard>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PlayableCard from '../../card/PlayableCard.vue'

@Options({
    name: "DiscardFromHandManager",
    components: {
        PlayableCard
    },
    props: {
        content: Array,
    }
})
export default class DiscardFromHandManager extends Vue {

    private content!: string[]

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

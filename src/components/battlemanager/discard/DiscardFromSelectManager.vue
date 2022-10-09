<template>
    <div class="being-discarded">
        <Card v-for="(card, index) in content"
            :key="index"
            :id="card"
            :state="'discardedFromSelect'"
            :style="'transform : scale(0)'"
        >
        </Card>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Card from '../../card/Card.vue'

@Options({
    name: "DiscardFromSelectManager",
    components: {
        Card
    },
    props: {
        content: Array,
    }
})
export default class DiscardFromSelectManager extends Vue {

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

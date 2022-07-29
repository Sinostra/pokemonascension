<template>
    <div class="battlemanager">
        <BattleScene/>
        <BattleInterface/>
    </div>
</template>

<script lang="ts">
import BattleScene from './battlemanager/BattleScene.vue'
import BattleInterface from './battlemanager/BattleInterface.vue'
import { Options, Vue } from 'vue-class-component'

@Options({
    name: "BattleManager",
    components: {
        BattleScene,
        BattleInterface
    }
})

export default class BattleManager extends Vue {

    private playCard(cardId: string, index: number | null) {
        console.log(cardId, index)

    }

    public mounted() {
        this.$store.subscribeAction((action) => {
            if(action.type === "playCurrentlySelectedCard") {
                this.playCard(this.$store.state.board.selectedCard, action.payload)
            }
        })
    }

}
</script>

<style lang='scss' scoped>
.battlemanager {
    position: absolute;
    width: 100%;
    height: 100%;
}

</style>



<template>
    <div class="modal-wrapper">
        <div v-if="$store.state.battle.displayBattleRewards" class="victory-wrapper">
            <div class="modal-txt">Victory !</div>
            <CardChoice></CardChoice>
            <div class="modal-btn" @click="onClickNextBattle()">Go to the next battle</div>
        </div>
        <div v-if="$store.state.battle.playerLost" class="defeat-wrapper">
            <div class="modal-txt">Defeat !</div>
            <div class="modal-btn" @click="onClickRestart()">Restart</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import CardChoice from "./CardChoice.vue"
import cloneDeep from "lodash.clonedeep"

@Options({
    name: "AfterBattleModal",
    components: {
        CardChoice
    }
})
export default class AfterBattleModal extends Vue {
    public onClickNextBattle() {
        const nextFoes = cloneDeep(this.$store.state.allFoes.dataFoes[1])
        this.$store.dispatch("goToNextBattle", nextFoes)
    }

    public onClickRestart() {
        this.$store.dispatch("resetGame")
    }
}
</script>
<style lang="scss" scoped>
@import './style/afterBattleModal.scss';
</style>
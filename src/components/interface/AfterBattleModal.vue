<template>
    <div class="modal-wrapper">
        <div v-if="$store.state.battle.displayBattleRewards" class="victory-wrapper">
            <div class="modal-txt">Victory !</div>
            <div class="modal-btn" @click="onClickNextBattle()">Go to the next battle</div>
        </div>
        <div v-if="$store.state.battle.playerLost" class="defeat-wrapper">
            <div class="modal-txt">Defeat !</div>
            <div class="modal-btn" @click="onClickRestart()">Restart</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { inject } from 'vue'

export default class AfterBattleModal extends Vue {
    private emitter: any = inject('emitter')

    public onClickNextBattle() {
        this.$store.dispatch("goToNextBattle")
    }

    public onClickRestart() {
        this.$store.dispatch("resetGame")
    }
}
</script>
<style lang="scss" scoped>
@import './style/afterBattleModal.scss';
</style>
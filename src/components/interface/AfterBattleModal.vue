<template>
    <div class="modal-wrapper">
        <div class="modal-txt">Victory !</div>
        <div class="modal-btn" @click="onClickNextBattle()">Go to the next battle</div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { inject } from 'vue'

export default class AfterBattleModal extends Vue {
    private emitter: any = inject('emitter')

    public onClickNextBattle(): void {
        this.$store.commit("stopDisplayBattleRewards")
        this.$store.commit("setFoes", this.$store.state.allFoes.dataFoes[1])
        this.$store.commit("changeBackground", 'forest.gif')
        this.$store.commit("startBattle", "forest")
    }
}
</script>
<style lang="scss" scoped>
@import './style/afterBattleModal.scss';
</style>
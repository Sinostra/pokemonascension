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
import cloneDeep from "lodash.clonedeep"

export default class AfterBattleModal extends Vue {
    private emitter: any = inject('emitter')

    public onClickNextBattle() {
        this.$store.commit("setFoes", [])
        this.$store.commit("stopDisplayBattleRewards")
        this.$store.commit("setFoes", cloneDeep(this.$store.state.allFoes.dataFoes[1]))
        this.$store.commit("changeBackground", 'forest')
        this.$store.commit("startBattle")
    }

    public onClickRestart() {
        this.$store.commit("emptyPlayerTeam")
        this.$store.commit("setFoes", [])
        this.$store.commit("stopBattle")
        this.$store.commit("resetPlayerStatus")
        this.$store.commit("stopDisplayBattleRewards")
        this.$store.commit("changeBackground", 'starter_background')
        this.$store.commit("setEvent", 'starterChoice')
    }
}
</script>
<style lang="scss" scoped>
@import './style/afterBattleModal.scss';
</style>
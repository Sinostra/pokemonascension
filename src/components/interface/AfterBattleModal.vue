<template>
    <div class="modal-wrapper">
        <div v-if="playerStillInGame" class="victory-wrapper">
            <div class="modal-txt">Victory !</div>
            <CardChoice></CardChoice>
            <div class="modal-btn" @click="onClickNextBattle()">Continue</div>
        </div>
        <div v-if="!playerStillInGame" class="defeat-wrapper">
            <div class="modal-txt">Defeat !</div>
            <div class="modal-btn" @click="onClickRestart()">Restart</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import CardChoice from "./CardChoice.vue"

@Options({
    name: "AfterBattleModal",
    components: {
        CardChoice
    }
})
export default class AfterBattleModal extends Vue {
    public onClickNextBattle() {
        this.$store.dispatch("playNextStep")
    }

    public onClickRestart() {
        this.$store.commit("emptyPlayerTeam")
        this.$store.dispatch("playEvent", 0)
    }

    get playerStillInGame(): boolean {
        return !!this.$store.getters.getNotFaintedPokemon.length
    }
}
</script>
<style lang="scss" scoped>
@import './style/afterBattleModal.scss';
</style>
<template>
    <div class="modal-wrapper">
        <div v-if="playerStillInGame" class="victory-wrapper">
            <div class="modal-txt">Victory !</div>
            <CardChoice class="card-choice"></CardChoice>
            <div class="modal-btn" @click="$store.dispatch('playNextStep')">Continue</div>
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
    public onClickRestart() {
        this.$store.commit("emptyPlayerTeam")
        this.$store.dispatch("playevent", 0)
        this.$store.commit("returnToFirstBattle")
    }

    get playerStillInGame(): boolean {
        return !!this.$store.getters.getNotFaintedPokemon.length
    }
}
</script>
<style lang="scss" scoped>
@import './style/afterBattleModal.scss';
</style>
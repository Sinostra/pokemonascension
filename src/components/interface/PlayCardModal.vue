<template>
    <div class="modal-wrapper">
        <div v-if="!$store.state.cards.dataCards[$store.state.board.selectedCard]['target']">
            <div>Jouer cette carte ?</div>
            <div class="modal-btn" @click="onClick()">Oui</div>
            <div class="modal-btn" @click="onClickCancel()">Non</div>
        </div>
        <div v-else>
            <div>Choisissez votre cible</div>
            <div class="modal-btn" @click="onClickCancel()">Annuler</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class PlayCardModal extends Vue {
    private onClickCancel(): void {
        this.$store.dispatch("rightClick")
    }
}
</script>
<style lang="scss" scoped>
@import './style/playCardModal.scss';
</style>
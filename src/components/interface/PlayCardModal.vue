<template>
    <div class="modal-wrapper">
        <div v-if="!$store.state.cards.dataCards[$store.getters.selectedCard]['target']">
            <div>Jouer cette carte ?</div>
            <div class="modal-btn" @click="onClickPlay()">Oui</div>
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
    public onClickCancel(): void {
        this.$store.dispatch("rightClick")
    }

    public onClickPlay(): void {
        this.$store.dispatch("playCurrentlySelectedCard", null)
    }
}
</script>
<style lang="scss" scoped>
@import './style/playCardModal.scss';
</style>
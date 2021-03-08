<template>
<div class="choice-interface">
    <div class="after-battle">
        <div class="text">You <span v-if="$store.state.battle.victory">Won !</span><span v-if="!$store.state.battle.victory">Lost !</span></div>
        <div @click="clickPlayAgain()" class="btn">Play again ?</div>    
    </div>
    
</div>
</template>

<script>
export default {
    name: 'ChoiceInterface',

    data: function() {
        return {

        }
    },

    methods: {
        clickPlayAgain() {
            this.$store.dispatch('changeisBattleOnGoing', true)
        }
    }
}

</script>
<style lang="scss" scoped>
.choice-interface {
    position: absolute;
    width: 100%;
    height: calc(100% - 6%);
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .after-battle {
        font-size: 20px;
        color: #fff;

        .text {
            text-align: center;
        }
    }
}
</style>
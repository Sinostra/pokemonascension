<template>
    <div class="battlemanager">
        <BattleScene/>
        <BattleInterface/>
    </div>
</template>

<script>
import BattleScene from './battlemanager/BattleScene.vue'
import BattleInterface from './battlemanager/BattleInterface.vue'
export default {
    name: "Battle",

    components: {
        BattleScene,
        BattleInterface
    },

    methods: {
    }
}
</script>

<style lang='scss' scoped>
.battlemanager {
    width: 100%;
}

</style>



<template>

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
    name: "CardChoice",
})
export default class CardChoice extends Vue {
    public mounted() {
        const cardChoice = this.$store.getters.getActivePokemon.id
        console.log(cardChoice)
    }
}
</script>
<style lang="scss" scoped>
</style>
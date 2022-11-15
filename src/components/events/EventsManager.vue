<template>
    <component v-bind:is="$store.state.events.currentEvent" class="current-event"></component>
</template>

<script lang="ts">

import StarterChoice from './StarterChoice.vue'
import PokemonCenter from './PokemonCenter.vue'
import { Options, Vue } from 'vue-class-component'

@Options({
    name: "EventsManager",
    components: {
        StarterChoice,
        PokemonCenter
    }
})

export default class EventsManager extends Vue {}

</script>
<style lang="scss">
    .current-event {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 2;
    }
</style>
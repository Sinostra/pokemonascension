<template>
    <component v-bind:is="$store.state.events.currentEvent"></component>
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
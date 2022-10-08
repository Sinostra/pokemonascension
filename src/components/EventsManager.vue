<template>
    <component v-bind:is="$store.state.events.currentEvent"></component>
</template>

<script lang="ts">

import StarterChoice from './events/StarterChoice.vue'
import { Options, Vue } from 'vue-class-component'

@Options({
    name: "EventsManager",
    components: {
        StarterChoice,
    }
})

export default class EventsManager extends Vue {}

</script>
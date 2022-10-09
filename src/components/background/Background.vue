<template>
    <div v-if="$store.getters.getBackgroundUsed" class="background-wrapper" :class="$store.getters.getBackgroundUsed">
        <div class="weather-wrapper" :class="$store.state.battle.currentWeather"></div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class Background extends Vue {}
</script>

<style lang='scss' scoped>
@import './style/background.scss';
@import '../animations/background/weather.scss';
</style>
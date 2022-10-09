<template>
    <div v-if="$store.getters.getBackgroundUsed" class="background-wrapper" :class="backgroundClass"></div>
</template>

<script lang="ts">
import {  Vue } from 'vue-class-component'

export default class Background extends Vue {

    private weatherFrame: number = 1

    private weather: string | null = null

    private animWeather() {
        if(!this.weather) {
            return
        }
        if(this.weatherFrame === 3) {
            this.weatherFrame = 1
        }
        else {
            this.weatherFrame++
        }
        setTimeout(() => {
            this.animWeather()
        }, 166)
    }

    public mounted() {
        this.animWeather()
    }

    get backgroundClass() {
        return `${this.$store.getters.getBackgroundUsed} ${this.$store.state.battle.currentWeather}`
    }

    get weatherUrl() {
        if(!this.weather) {
            return
        }
        return require(`@/assets/img/backgrounds/weather/${this.weather}/frame_${this.weatherFrame}.png`)
    }

}
</script>

<style lang='scss' scoped>
@import './style/background.scss';
</style>
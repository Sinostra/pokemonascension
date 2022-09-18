<template>
    <div v-if="$store.getters.getBackgroundUsed" class="background-wrapper" :style="backgroundStyle"></div>
</template>

<script lang="ts">
import {  Vue } from 'vue-class-component'

export default class Background extends Vue {

    private weatherFrame: number = 1

    private weather: string | null = 'rain'

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

    get backgroundStyle() {
        const weatherBackground = this.weather ? `url(${this.weatherUrl}),` : ''
        return `background: ${weatherBackground} url(${this.backgroundUrl}); background-size: cover`
    }

    get backgroundUrl() {
        return require('@/assets/img/backgrounds/' + this.$store.getters.getBackgroundUsed) 
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
.background-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -1;
    background-size: cover;
    background-position: bottom;
    background-repeat: no-repeat;
}
</style>
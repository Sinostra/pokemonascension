<template>
    <div class="box-wrapper">
        <div>x: {{$store.getters.mouseCoordinates.x}}</div>
        <div>y: {{$store.getters.mouseCoordinates.y}}</div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
    name: "DebugBox",
})

export default class DebugBox extends Vue {

}
</script>
<style lang="scss" scoped>
    .box-wrapper {
        background: black;
        padding: 20px;
        color: #fff;
    }
</style>
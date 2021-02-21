<template>
    <div class="card text">{{id}}</div>
</template>

<script>
export default {
    name: 'Card',

    data: function(){
        return {}
    },

    props:['id'],

    methods: {

    }
}

</script>
<style lang='scss' scoped>
.card {
    width: 10.2%;
    height: 100%;
    background: #182552;
    color: #fff;
    border-radius: 10px;
    border: 2px solid #000;
    position: absolute;
    cursor: pointer;
    &:hover {
        z-index: 2;
        width: 12.2%;
        height: 106%;
    }
    &.selected {
        z-index: 2;
        width: 15.5%;
        height: 136%;
    }
}
</style>
<template>
    <div class="card">{{id}}</div>
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
    width: 130px;
    height: 200px;
    background: #182552;
    color: #fff;
    border-radius: 10px;
    border: 2px solid #000;
    position: absolute;
    cursor: pointer;
    &.selected {
        z-index: 2;
        width: 156px;
        height: 240px;
    }
    &:hover {
        z-index: 2;
        width: 156px;
        height: 240px;
    }
}
</style>
<template>
    <div class="pokemon-wrapper">
        <img :src="getSprite()">
        <div class="heathBar">
            <div class="currentHealth" :class="getHealthBarClass()" :style="{'width': getHealthBarPercent() + '%'}"></div>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'Pokemon',

    data: function() {
        return {
            maxPv: 30,
            pv: 30
        }
    },

    props: ['number'],

    methods: {
        getSprite() {
            return require('../../assets/img/sprites/' + this.number + '.png')
        },

        getHealthBarPercent() {
            return parseInt((this.pv  / this.maxPv) * 100)
        },

        getHealthBarClass() {
            var healthPercentage = parseInt((this.pv  / this.maxPv) * 100);
            if(healthPercentage > 67) return 'green'
            else if(healthPercentage > 33 && healthPercentage <= 67) return 'orange'
            else return 'red'
        }
    }
}
</script>
<style lang='scss' scoped>

.pokemon-wrapper {
    display: flex;
    flex-direction: column;
}

.heathBar {
    min-height: 5px;
    background-color: black;

    .currentHealth {
        height: 5px;

        &.green {
            background: green;
        }

        &.orange {
            background: orange;
        }

        &.red {
            background: red;
        }
    }
}
</style>
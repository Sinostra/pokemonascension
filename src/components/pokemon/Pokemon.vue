<template>
    <div class="pokemon-wrapper">
        <img :src="getSprite()">
        <!-- <div v-on:click="dealDamage(2)" class="btn">Click here !</div> -->
        <div class="healthBar-infos-wrapper">
            <div class="heathBar">
                <div class="currentHealth" :class="getHealthBarClass()" :style="{'width': getHealthBarPercent() + '%'}"></div>
            </div>
            <div class="infos">
                <div class="healthAmount">{{pv}} / {{maxPv}}</div>
                <div class="type-picto"></div>
            </div>
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
        },

        dealDamage(amount) {
            if(amount > this.pv) this.pv = 0
            else this.pv -= amount
        },

        heal(amount) {
            if(amount + this.pv > this.maxPv) this.pv = this.maxPv
            else this.pv += amount
        }
    }
}
</script>
<style lang='scss' scoped>

.pokemon-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;

    img {
        display: block;
        width: 100%;
    }
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

.btn {
    margin: 50px 0;
    padding: 20px;
    background: black;
    color: #fff;
    cursor: pointer;
}
</style>
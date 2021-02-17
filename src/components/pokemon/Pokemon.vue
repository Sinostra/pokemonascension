<template>
    <div class="pokemon-wrapper" @click="clickOnWrapper()" :style="{'width': $store.state.pokedex.constantDex[number]['size'] + '%'}">
        <img :src="getSprite()">
        <!-- <div v-on:click="dealDamage(2)" class="btn">Click here !</div> -->
        <div class="healthBar-infos-wrapper">
            <div class="heathBar">
                <div class="currentHealth" :class="getHealthBarClass()" :style="{'width': getHealthBarPercent() + '%'}"></div>
            </div>
            <div class="infos">
                <div class="healthAmount">{{pv}}/{{maxPv}}</div>
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
            maxPv: 1,
            pv: 1,
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

        clickOnWrapper() {
            if(this.$store.state.fight.selectedCard != null) {
                console.log('card played')
            }
        },

        dealDamage(amount) {
            if(amount > this.pv) this.pv = 0
            else this.pv -= amount
        },

        heal(amount) {
            if(amount + this.pv > this.maxPv) this.pv = this.maxPv
            else this.pv += amount
        }
    },

    mounted: function(){
        this.maxPv = this.$store.state.pokedex.constantDex[this.number]['hp']
        this.pv = this.maxPv
    }
}
</script>
<style lang='scss' scoped>

.pokemon-wrapper {
    position: absolute;
    z-index: 3;

    img {
        display: block;
        width: 100%;
    }
}

.heathBar {
    height: 15px;
    background-color: #363636;
    border: 2px solid #000;

    .currentHealth {
        height: 15px;

        &.green {
            background: #45c43a;
        }

        &.orange {
            background: #e5bf37;
        }

        &.red {
            background: #ef3131;
        }
    }
}

.healthAmount {
    font-family: 'Open Sans', sans-serif;
    font-weight: 800;
    font-style: italic;
    color: #fff;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
}

.btn {
    margin: 50px 0;
    padding: 20px;
    background: black;
    color: #fff;
    cursor: pointer;
}
</style>
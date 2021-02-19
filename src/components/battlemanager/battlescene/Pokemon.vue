<template>
    <div class="pokemon-wrapper" :class="getWrapperClass()" @click="clickOnWrapper()" :style="{'width': $store.state.pokedex.constantDex[number]['size'] + '%'}">
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
            fainted: false
        }
    },

    props: ['number', 'pv'],

    watch: {
        pv: function(newVal) {
            if(newVal == 0) this.fainted = true
        }
    },

    methods: {
        getSprite() {
            return require('../../../assets/img/sprites/' + this.number + '.gif')
        },

        getWrapperClass() {
            return {
                cardSelected: this.$store.state.battle.selectedCard != null,
                fainted : this.fainted
            }
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
            if(this.$store.state.battle.selectedCard != null) {
                this.$emit('card-played')
            }
        },

    },

    mounted: function(){
        this.maxPv = this.$store.state.pokedex.constantDex[this.number]['hp']
    }
}
</script>
<style lang='scss' scoped>

.pokemon-wrapper {
    position: absolute;
    z-index: 3;


    &.player {
        left: 18%;
        bottom: 6%;
        img {
            transform: scaleX(-1);
            margin-bottom: 10%;
        }
    }

    &.foe {
        display: flex;
        flex-direction: column-reverse;

        &.cardSelected {
            cursor: pointer;
            &:hover {
                filter: drop-shadow(2px 4px 6px black);
            }
        }

        .heathBar {
            width: 50%;
            border: 1px solid #000;
            margin: 0 auto;
            .currentHealth {
                padding: 5% 0;
            }
        }
        .infos {
           width: 50%;
           margin: 0 auto;
        }
    }


    &.fainted {
        display: none;
    }

    img {
        display: block;
        width: 100%;
    }
}

.heathBar {
    background-color: #363636;
    border: 2px solid #000;

    .currentHealth {
        padding: 6% 0;

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
    font-size: 100%;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
}
</style>
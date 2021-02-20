<template>
    <div class="pokemon-wrapper" :class="getWrapperClass()">
        <img :src="getSprite()" @click="clickOnImg()" :style="{'width': $store.state.pokedex.constantDex[number]['size'] + '%'}">
        <!-- <div v-on:click="dealDamage(2)" class="btn">Click here !</div> -->
        <div class="healthBar-infos-wrapper" :style="getHeathBarPosition()">
            <div class="heathBar">
                <div class="currentHealth" :class="getHealthBarClass()" :style="{'width': getHealthBarPercent() + '%'}"></div>
            </div>
            <div class="infos">
                <div class="healthAmount text">{{pv}}/{{maxPv}}</div>
                <div class="type-picto"></div>
            </div>
            <!-- <div class="type"></div> -->
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'Pokemon',

    data: function() {
        return {
            maxPv: 1,
            fainted: false,
        }
    },

    props: ['number', 'pv', 'isPlayer'],

    watch: {
        pv: function(newVal) {
            if(newVal == 0) this.fainted = true
        }
    },

    methods: {
        getSprite() {
            return require('../../../assets/img/sprites/' + this.number + '.gif')
        },

        // WIP 
        // getPokemonTpye(number) {
        //     var types = this.$store.state.pokedex.constantDex[number]['type']

        // },

        // getPokemonTpyeIcon(type) {
        //     return require('../../../assets/img/types/' + type + '.png')
        // },

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

        getHeathBarPosition() {
            if(!this.isPlayer) {
                var hpBarPosition = this.$store.state.pokedex.constantDex[this.number]['hpBar']
                return 'left: ' +  hpBarPosition['left'] + '%; top: ' +  hpBarPosition['top'] + '%;'
            }
        },

        clickOnImg() {
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
    width: 20%;
    height: 20%;

    &.player {
        img {
            transform: scaleX(-1);
        }
    }

    &.foe {

        &.cardSelected {
            cursor: pointer;
            &:hover {
                filter: drop-shadow(2px 4px 6px black);
            }
        }

        .healthBar-infos-wrapper {

            .heathBar {
                width: 75%;
                height: 30%;
                border: 1px solid #000;
            }
        }

    }


    &.fainted {
        display: none;
    }

    img {
        position: absolute;
        bottom: 0;
        left: 0;
        display: block;
    }

    .healthBar-infos-wrapper {
        position: absolute;
        width: 50%;
        height: 20%;
        bottom: -25%;
        left: 6%;

        .heathBar {
            width: 100%;
            height: 50%;
            background-color: #363636;
            border: 2px solid #000;
            position: relative;

            .currentHealth {
                height: 100%;

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

        .type {
            position: absolute;
            width: 17%;
            height: 50%;
            top: 0;
            right: -20%;
            background: #fff;
        }
    }
}
</style>
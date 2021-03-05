<template>
    <div class="pokemon-wrapper" :class="getWrapperClass()" :style="getTextStrokeWidth()">
        <img :class="attackAnim()" :src="getSprite()" :style="{'width': $store.state.pokedex.constantDex[number]['size'] + '%'}">
        <div class="healthBar-infos-wrapper" :style="getHeathBarPosition()">
            <div class="heathBar">
                <div class="currentHealth" :class="getHealthBarClass()" :style="{'width': getHealthBarPercent() + '%'}"></div>
            </div>
            <div class="infos">
                <div v-if="!isPlayer && !turnPlayed" class="intent text" :style="getFontSize(1.2)">
                    <img v-if="intent['block'] > 0" :src="getShield()">
                    <div v-if="intent['damage'] > 0">{{intent['damage']}}</div>
                </div>
                <div class="healthAmount text" :style="getTextStrokeWidth()">{{pv}}/{{maxPv}}</div>
                <div class="type-picto"></div>
            </div>
            <div class="block-wrapper">
                {{block}}
            </div>
            <div class="types-wrapper">
                <div class="type" v-for="(type, index) in $store.state.pokedex.constantDex[number]['type']" :key="index">
                    <img :src="getPokemonTpyeIcon($store.state.pokedex.constantDex[number]['type'][index])">
                </div>
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
            fainted: false,
        }
    },

    props: [
        'number',
        'pv',
        'block',
        'isPlayer',
        'intent',
        'playAttackAnim',
        'turnPlayed'
    ],

    watch: {
        pv: function(newVal) {
            if(newVal == 0) this.fainted = true
        },
    },

    methods: {
        attackAnim() {
            return {
                attackAnim: this.playAttackAnim
            }
        },

        getSprite() {
            return require('../../../assets/img/sprites/' + this.number + this.$store.state.settings.pokemonSpritesExtension)
        },

        getPokemonTpyeIcon(type) {
            return require('../../../assets/img/types/' + type + '.png')
        },

        getWrapperClass() {
            return {
                cardSelected: this.$store.state.battle.selectedCard != null,
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

        getFontSize(multiplier = 1) {
            return 'font-size: ' + (this.$store.state.baseFontSize) * multiplier + 'px;'
        },

        getTextStrokeWidth() {
            return '-webkit-text-stroke-width: ' + (this.$store.state.baseFontSize) / 12 + 'px;'
        },

        getShield() {
            return require('../../../assets/img/interface/shield.png')
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
    width: 14%;
    height: 20%;

    &.player {
        img {
            transform: scaleX(-1);

            &.attackAnim {
                animation-name: attack;
                animation-duration: .35s;
                animation-timing-function: linear;
            }
        }

        .healthBar-infos-wrapper .types-wrapper {
            top: -15%;
            right: -21%;

            .type img {
                transform: scaleX(1);
            }
        }
    }

    &.foe {

        img.attackAnim {
            animation-name: foe-attack;
            animation-duration: .35s;
            animation-timing-function: linear;
        }

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
            -webkit-text-stroke-color: black;
        }

        .types-wrapper {
            position: absolute;
            width: 20%;
            height: 100%;
            top: -15%;
            right: 2%;

            .type {
                position: absolute;
                width: 100%;

                &:nth-child(2) {
                    left: 100%;
                }
                img {
                    position: static;
                    width: 100%;
                }
            }
        }

        .block-wrapper {
            position: absolute;
            background: #e0e0e0;
            color: black;
            top: -14%;
            left: -35%;
            padding: 10%;
        }
    }

    .intent {
        position: absolute;
        top: -110%;
        left: 25%;
        font-family: 'Open Sans', sans-serif;
        font-weight: 800;
        font-style: italic;
        color: #fff;
        -webkit-text-stroke-color: black;
        width: 13%;
        height: 95%;

        img {
            position: absolute;
            top: 5%;
            left: -50%;
            width: 200%;
            height: 90%;
            z-index: -1;
        }
    }
}

@keyframes attack {
    0% {
        transform: translate(0) scaleX(-1);
    }

    50% {
        transform: translate(50%) scaleX(-1);
    }

    100% {
        transform: translate(0) scaleX(-1);
    }
}

@keyframes foe-attack {
    0% {
        transform: translate(0);
    }

    50% {
        transform: translate(-50%);
    }

    100% {
        transform: translate(0);
    }
}

/* Anim faint */

// Blanc
// .anim {
//     filter: brightness(10)
// }


// Rose
// .anim {
//     filter: brightness(10) brightness(0.5) sepia(1) hue-rotate(311deg) saturate(10) brightness(3);
// }

//Rouge
// .anim {
//     filter: brightness(10) brightness(0.5) sepia(1) hue-rotate(311deg) saturate(10) brightness(1.8)
// }

</style>
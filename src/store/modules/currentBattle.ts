export default {
    state: {
        currentEnergy: 0,
        maxEnergy: 3,
        selectedCard: null,
        draggedCard: null,
        turnCounter: 0,
        indexFoeHover: null,
        battleToDisplay: false,
        isBattleOngoing: false,
        currentWeather: '',
        player: {},
        foeTeam: [],
    },

    mutations: {
        getEnergy(state, amount: number) {
            state.currentEnergy += amount
        },

        spendEnergy(state, amount: number) {
            state.currentEnergy -= amount
        },

        setEnergy(state, amount: number) {
            state.currentEnergy = amount
        },

        selectCard(state, value) {
            state.selectedCard = value
        },

        dragCard(state, value) {
            state.draggedCard = value
        },

        startNewTurn(state) {
            state.turnCounter++
        },

        mouseOver(state, types) {
            state.indexFoeHover = types
        },

        startBattle(state) {
            state.battleToDisplay = true
            state.isBattleOngoing = true
        },
        stopBattle(state) {
            state.isBattleOngoing = false
            state.turnCounter = 0
        },
        stopBattleDisplay(state) {
            state.battleToDisplay = false
        },

        setWeather(state, weather) {
            state.currentWeather = weather 
        },

        setFoes(state, foes) {
            state.foeTeam = foes.map((foe) => {
                return {
                    id: foe.id,
                    fainted: false,
                    stats: {
                        hp: foe.baseStats.hp,
                        attack: foe.baseStats.attack,
                        defense: foe.baseStats.defense,
                    },
                    patternSetting: foe.patternSetting,
                    stacks: {},
                }
            })
        },
        buffFoeAttack(state, payload) {
            if(!state.foeTeam[payload.index]) {
                return
            }

            state.foeTeam[payload.index]['stats']['attack'] += payload.buff
        },
        buffFoeDefense(state, payload) {
            if(!state.foeTeam[payload.index]) {
                return
            }

            state.foeTeam[payload.index]['stats']['defense'] += payload.buff
        },
        addStackToFoe(state, payload) {
            if(!state.foeTeam[payload.target]['stacks'][payload.type]) {
                state.foeTeam[payload.target]['stacks'][payload.type] = payload.value
            }

            else {
                state.foeTeam[payload.target]['stacks'][payload.type] += payload.value
            }
        },
        setFoeFainted(state, index) {
            if(!state.foeTeam[index]) {
                return
            }
            state.foeTeam[index].fainted = true
        }
    },

    getters: {
        selectedCard: state => {
            return state.selectedCard
        },

        getFoeTeam: state => {
            return state.foeTeam
        },

        getNotFaintedFoes: state => {
            return state.foeTeam.filter((foe) => !foe.fainted)
        }
    }
}
export default {
    state: {
        foeTeam: [],
    },

    mutations: {
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
        getFoeTeam: state => {
            return state.foeTeam
        },

        getNotFaintedFoes: state => {
            return state.foeTeam.filter((foe) => !foe.fainted)
        }
    }
}
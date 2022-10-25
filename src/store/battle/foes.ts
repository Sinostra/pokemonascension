export default {
    state: {
        foeTeam: [],
    },

    mutations: {
        setFoes(state, foes) {
            state.foeTeam = foes.map((foe) => {
                return {
                    id: foe.id,
                    fainted: foe.fainted,
                    stats: {
                        hp: foe.baseStats.hp,
                        attack: foe.baseStats.attack,
                        defense: foe.baseStats.defense,
                    },
                    patternSetting: foe.patternSetting,
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
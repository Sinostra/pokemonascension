export default {
    state: {
        foeTeam: [
            {
                id: '007',
                baseStats: {
                    hp: 50,
                    attack: 1,
                    defense: 2
                },
                patternSetting: {}
            },
            {
                id: '008',
                baseStats: {
                    hp: 55,
                    attack: 1,
                    defense: 2
                },
                patternSetting: {}
            },
            {
                id: '009',
                baseStats: {
                    hp: 60,
                    attack: 1,
                    defense: 2
                },
                patternSetting: {
                    patternIndexToRandomise: [0,1]
                }
            }
        ],
        patterns: [
            [
                // {
                //     buffSelfAttack: 1,
                //     buffSelfDefense: 1,
                //     damage: 0,
                //     block: 0,
                //     type: 'flying',
                //     damageTimes: 1,
                // },
                {
                    damage: 1,
                    block: 2,
                    type: 'flying',
                    damageTimes: 3,
                },
            ],
            [
                {
                    damage: 3,
                    block: 0,
                    type: 'ground'
                },
            ],
            [
                {
                    damage: 0,
                    block: 4,
                    type: 'normal'
                },
                {
                    damage: 4,
                    block: 0,
                    type: 'water'
                },
                [
                    {
                        damage: 3,
                        block: 0,
                        type: 'normal'
                    },
                    {
                        damage: 2,
                        block: 2,
                        type: 'normal'
                    }
                ],
            ]
        ]
    },

    mutations: {

    },

    actions: {

    },

    getters: {
        getFoeTeam: state => {
            return state.foeTeam
        },
    }
}
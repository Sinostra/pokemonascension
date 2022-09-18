export default [
    [
        {
            id: '010',
            baseStats: {
                hp: 40,
                attack: 1,
                defense: 1
            },
            fainted: false,
            patternSetting: {
                pattern: [
                    {
                        damage: 2,
                        type: 'normal',
                    },
                    {
                        block: 2,
                    },
                ]
            }
        },
        {
            id: '013',
            baseStats: {
                hp: 40,
                attack: 1,
                defense: 1
            },
            fainted: false,
            patternSetting: {
                pattern: [
                    {
                        damage: 2,
                        type: 'poison',
                    },
                    {
                        block: 2,
                    },
                ]
            }
        },
        {
            id: '011',
            baseStats: {
                hp: 50,
                attack: 1,
                defense: 2
            },
            fainted: false,
            patternSetting: {
                pattern: [
                    {
                        damage: 3,
                        type: 'normal',
                    },
                    {
                        block: 4,
                    },
                    {
                        block: 4,
                    },
                ],
            }
        }
    ],
    [
        {
            id: '014',
            baseStats: {
                hp: 50,
                attack: 1,
                defense: 2
            },
            fainted: false,
            patternSetting: {
                pattern: [
                    {
                        damage: 3,
                        type: 'poison',
                    },
                    {
                        block: 4,
                    },
                    {
                        block: 4,
                    },
                ]
            }
        },
        {
            id: '015',
            baseStats: {
                hp: 55,
                attack: 3,
                defense: 1
            },
            fainted: false,
            patternSetting: {
                pattern: [
                    {
                        damage: 2,
                        damageTimes: 2,
                        type: 'bug',
                    },
                    {
                        damage: 4,
                        type: 'poison',
                    },
                    {
                        block: 3,
                    },
                ]
            }
        },
        {
            id: '012',
            baseStats: {
                hp: 55,
                attack: 3,
                defense: 1
            },
            fainted: false,
            patternSetting: {
                pattern: [
                    {
                        damage: 4,
                        type: 'bug',
                    },
                    {
                        damage: 4,
                        type: 'flying',
                    },
                    {
                        block: 3,
                    },
                ]
            }
        },
    ]
]
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
                        name: 'AttackEffect',
                        type: 'normal',
                        params: {
                            damage: 2,
                        }
                    },
                    {
                        name: 'BlockEfffect',
                        type: 'normal',
                        params: {
                            block: 2,
                        }
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
                        name: 'AttackEffect',
                        type: 'poison',
                        params: {
                            damage: 2,
                        }
                    },
                    {
                        name: 'BlockEfffect',
                        type: 'normal',
                        params: {
                            block: 2,
                        }
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
                        name: 'AttackEffect',
                        type: 'normal',
                        params: {
                            damage: 3,
                        }
                    },
                    {
                        name: 'BlockEfffect',
                        type: 'normal',
                        params: {
                            block: 4,
                        }
                    },
                    {
                        name: 'BlockEfffect',
                        type: 'normal',
                        params: {
                            block: 4,
                        }
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
                        name: 'AttackEffect',
                        type: 'poison',
                        params: {
                            damage: 3,
                        }
                    },
                    {
                        name: 'BlockEfffect',
                        type: 'normal',
                        params: {
                            block: 4,
                        }
                    },
                    {
                        name: 'BlockEfffect',
                        type: 'normal',
                        params: {
                            block: 4,
                        }
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
                        name: 'MultiAttackEffect',
                        type: 'bug',
                        params: {
                            damage: 2,
                            damageTimes: 2,
                        }
                    },
                    {
                        name: 'AttackEffect',
                        type: 'poison',
                        params: {
                            damage: 4,
                        }
                    },
                    {
                        name: 'BlockEfffect',
                        type: 'normal',
                        params: {
                            block: 3,
                        }
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
                        name: 'AttackEffect',
                        type: 'bug',
                        params: {
                            damage: 4,
                        }
                    },
                    {
                        name: 'AttackEffect',
                        type: 'flying',
                        params: {
                            damage: 4,
                        }
                    },
                    {
                        name: 'BlockEfffect',
                        type: 'normal',
                        params: {
                            block: 3,
                        }
                    },
                ]
            }
        },
    ]
]
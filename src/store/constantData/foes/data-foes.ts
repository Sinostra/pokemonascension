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
                            value: 2,
                            modifiers: ["userAttack"]
                        }
                    },
                    {
                        name: 'BlockEfffect',
                        type: 'normal',
                        params: {
                            value: 2,
                            modifiers: ["userDefense"]
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
                            value: 2,
                            modifiers: ["userAttack"]
                        }
                    },
                    {
                        name: 'BlockEfffect',
                        type: 'normal',
                        params: {
                            value: 2,
                            modifiers: ["userDefense"]
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
                            value: 3,
                            modifiers: ["userAttack"]
                        }
                    },
                    {
                        name: 'BlockEfffect',
                        type: 'normal',
                        params: {
                            value: 4,
                            modifiers: ["userDefense"]
                        }
                    },
                    {
                        name: 'BlockEfffect',
                        type: 'normal',
                        params: {
                            value: 4,
                            modifiers: ["userDefense"]
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
                            value: 3,
                            modifiers: ["userAttack"]
                        }
                    },
                    {
                        name: 'BlockEfffect',
                        type: 'normal',
                        params: {
                            value: 4,
                            modifiers: ["userDefense"]
                        }
                    },
                    {
                        name: 'BlockEfffect',
                        type: 'normal',
                        params: {
                            value: 4,
                            modifiers: ["userDefense"]
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
                            value: 2,
                            damageTimes: 2,
                            modifiers: ["userAttack"]
                        }
                    },
                    {
                        name: 'AttackEffect',
                        type: 'poison',
                        params: {
                            value: 4,
                            modifiers: ["userAttack"]
                        }
                    },
                    {
                        name: 'BlockEfffect',
                        type: 'normal',
                        params: {
                            value: 3,
                            modifiers: ["userDefense"]
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
                            value: 4,
                            modifiers: ["userAttack"]
                        }
                    },
                    {
                        name: 'AttackEffect',
                        type: 'flying',
                        params: {
                            value: 4,
                            modifiers: ["userAttack"]
                        }
                    },
                    {
                        name: 'BlockEfffect',
                        type: 'normal',
                        params: {
                            value: 3,
                            modifiers: ["userDefense"]
                        }
                    },
                ]
            }
        },
    ]
]
export default [
    {
        id: 1,
        background: 'forest',
        foes: [
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
                            playAttackAnim: true,
                            params: {
                                value: 2,
                                modifiers: ["userAttack"]
                            }
                        },
                        {
                            name: 'BlockEffect',
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
                            playAttackAnim: true,
                            params: {
                                value: 2,
                                modifiers: ["userAttack"]
                            }
                        },
                        {
                            name: 'BlockEffect',
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
                            playAttackAnim: true,
                            params: {
                                value: 3,
                                modifiers: ["userAttack"]
                            }
                        },
                        {
                            name: 'BlockEffect',
                            type: 'normal',
                            params: {
                                value: 4,
                                modifiers: ["userDefense"]
                            }
                        },
                        {
                            name: 'BlockEffect',
                            type: 'normal',
                            params: {
                                value: 4,
                                modifiers: ["userDefense"]
                            }
                        },
                    ],
                }
            }
        ]
    },
    {
        id: 2,
        background: 'forest',
        foes: [
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
                            playAttackAnim: true,
                            params: {
                                value: 3,
                                modifiers: ["userAttack"]
                            }
                        },
                        {
                            name: 'BlockEffect',
                            type: 'normal',
                            params: {
                                value: 4,
                                modifiers: ["userDefense"]
                            }
                        },
                        {
                            name: 'BlockEffect',
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
                            playAttackAnim: true,
                            params: {
                                value: 2,
                                damageTimes: 2,
                                modifiers: ["userAttack"]
                            }
                        },
                        {
                            name: 'AttackEffect',
                            type: 'poison',
                            playAttackAnim: true,
                            params: {
                                value: 4,
                                modifiers: ["userAttack"]
                            }
                        },
                        {
                            name: 'BlockEffect',
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
                            playAttackAnim: true,
                            params: {
                                value: 4,
                                modifiers: ["userAttack"]
                            }
                        },
                        {
                            name: 'AttackEffect',
                            type: 'flying',
                            playAttackAnim: true,
                            params: {
                                value: 4,
                                modifiers: ["userAttack"]
                            }
                        },
                        {
                            name: 'BlockEffect',
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
    }
]
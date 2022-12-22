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
    },
    {
        id: 3,
        background: 'forest',
        foes: [
            {
                id: '016',
                baseStats: {
                    hp: 45,
                    attack: 1,
                    defense: 1
                },
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
                            name: 'AttackEffect',
                            type: 'flying',
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
                id: '019',
                baseStats: {
                    hp: 48,
                    attack: 2,
                    defense: 0
                },
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
                                value: 1,
                                modifiers: ["userDefense"]
                            }
                        },
                    ]
                }
            }
        ]
    },
    {
        id: 4,
        background: 'forest',
        foes: [
            {
                id: '021',
                baseStats: {
                    hp: 45,
                    attack: 2,
                    defense: 0
                },
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
                            name: 'AttackEffect',
                            type: 'flying',
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
                                value: 1,
                                modifiers: ["userDefense"]
                            }
                        },
                    ]
                }
            },
            {
                id: '023',
                baseStats: {
                    hp: 50,
                    attack: 2,
                    defense: 1
                },
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
                                value: 2,
                                modifiers: ["userDefense"]
                            }
                        },
                    ]
                }
            }
        ]
    },
    {
        id: 5,
        background: 'forest',
        foes: [
            {
                id: '025',
                baseStats: {
                    hp: 40,
                    attack: 2,
                    defense: 0
                },
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
                            name: 'AttackEffect',
                            type: 'electric',
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
                                value: 1,
                                modifiers: ["userDefense"]
                            }
                        },
                    ]
                }
            },
            {
                id: '104',
                baseStats: {
                    hp: 55,
                    attack: 1,
                    defense: 2
                },
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
                            name: 'AttackEffect',
                            type: 'ground',
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
                                value: 3,
                                modifiers: ["userDefense"]
                            }
                        },
                    ]
                }
            }
        ]
    },
    {
        id: 6,
        background: 'forest',
        foes: [
            {
                id: '017',
                baseStats: {
                    hp: 55,
                    attack: 2,
                    defense: 2
                },
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
                            name: 'AttackEffect',
                            type: 'flying',
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
                                value: 3,
                                modifiers: ["userDefense"]
                            }
                        },
                    ]
                }
            },
            {
                id: '022',
                baseStats: {
                    hp: 55,
                    attack: 3,
                    defense: 1
                },
                patternSetting: {
                    pattern: [
                        {
                            name: 'AttackEffect',
                            type: 'normal',
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
                                value: 2,
                                modifiers: ["userDefense"]
                            }
                        },
                    ]
                }
            }
        ]
    },
    {
        id: 7,
        background: 'forest',
        foes: [
            {
                id: '020',
                baseStats: {
                    hp: 58,
                    attack: 3,
                    defense: 1
                },
                patternSetting: {
                    pattern: [
                        {
                            name: 'AttackEffect',
                            type: 'normal',
                            playAttackAnim: true,
                            params: {
                                value: 4,
                                modifiers: ["userAttack"]
                            }
                        },
                        {
                            name: 'AttackEffect',
                            type: 'normal',
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
                                value: 2,
                                modifiers: ["userDefense"]
                            }
                        },
                    ]
                }
            },
            {
                id: '024',
                baseStats: {
                    hp: 60,
                    attack: 3,
                    defense: 2
                },
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
            }
        ]
    },
    {
        id: 8,
        background: 'forest',
        foes: [
            {
                id: "003",
                baseStats: {
                    hp: 90,
                    attack: 4,
                    defense: 3
                },
                patternSetting: {
                    pattern: [
                        {
                            name: 'MultiAttackEffect',
                            type: 'grass',
                            playAttackAnim: true,
                            params: {
                                value: 1,
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
                                value: 5,
                                modifiers: ["userDefense"]
                            }
                        },
                        {
                            name: 'SelfBuffEffect',
                            type: 'normal',
                            params: {
                                buffAttack: 1,
                                buffDefense: 1
                            }
                        },
                    ],
                    patternIndexToRandomise: []
                }
            }
        ]
    },
    {
        id: 9,
        background: 'forest',
        foes: [
            {
                id: "006",
                baseStats: {
                    hp: 90,
                    attack: 4,
                    defense: 3
                },
                patternSetting: {
                    pattern: [
                        {
                            name: 'MultiAttackEffect',
                            type: 'fire',
                            playAttackAnim: true,
                            params: {
                                value: 1,
                                damageTimes: 2,
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
                                value: 5,
                                modifiers: ["userDefense"]
                            }
                        },
                        {
                            name: 'SelfBuffEffect',
                            type: 'normal',
                            params: {
                                buffAttack: 1,
                                buffDefense: 1
                            }
                        },
                    ],
                    patternIndexToRandomise: []
                }
            }
        ]
    },
    {
        id: 10,
        background: 'forest',
        foes: [
            {
                id: "009",
                baseStats: {
                    hp: 90,
                    attack: 4,
                    defense: 3
                },
                patternSetting: {
                    pattern: [
                        {
                            name: 'MultiAttackEffect',
                            type: 'water',
                            playAttackAnim: true,
                            params: {
                                value: 1,
                                damageTimes: 2,
                                modifiers: ["userAttack"]
                            }
                        },
                        {
                            name: 'AttackEffect',
                            type: 'normal',
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
                                value: 5,
                                modifiers: ["userDefense"]
                            }
                        },
                        {
                            name: 'SelfBuffEffect',
                            type: 'normal',
                            params: {
                                buffAttack: 1,
                                buffDefense: 1
                            }
                        },
                    ],
                    patternIndexToRandomise: []
                }
            }
        ]
    }
]
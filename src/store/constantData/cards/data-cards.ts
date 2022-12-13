export default {
    "001": {
        "name": "thundershock",
        "category": "attack",
        "rarity": "common",
        "cost": 1,
        "target": true,
        "effect": {
            "name": "AttackEffect",
            "type": "electric",
            "playAttackAnim": true,
            "params": {
                "value": 6,
                "modifiers": ["userAttack"],
            }
        },
        "tooltip": 'Deal <span class="damage-amount">§</span> damage to an ennemy',
    },


    "002": {
        "name": "discharge",
        "category": "attack",
        "rarity": "medium",
        "cost": 1,
        "target": false,
        "effect": {
            "name": "AttackEffect",
            "type": "electric",
            "playAttackAnim": true,
            "cardAOE": true,
            "params": {
                "value": 3,
                "modifiers": ["userAttack"],
            }
        },
        "tooltip": 'Deal <span class="damage-amount">§</span> damage to all ennemies',
    },

    "003": {
        "name": "agility",
        "category": "ability",
        "rarity": "medium",
        "cost": 0,
        "target": false,
        "effect": {
            "name": "DrawEffect",
            "type": "psychic",
            "params": {
                "value": 2,
            }
        },
        "tooltip": 'Draw 2 cards',
    },

    "004": {
        "name": "protect",
        "category": "ability",
        "rarity": "common",
        "cost": 1,
        "target": false,
        "effect": {
            "name": "BlockEffect",
            "type": "normal",
            "params": {
                "value": 5,
                "modifiers": ["userDefense"]
            }
        },
        "tooltip": 'Gain µ block',
    },

    "005": {
        "name": "focus energy",
        "category": "ability",
        "rarity": "rare",
        "cost": 1,
        "target": false,
        "effect": {
            "name" : "EnergyEffect",
            "type": "normal",
            "params": {
                "value": 2,
            }
        },
        "tooltip": 'Gain 2 energy',
    },

    "006": {
        "name": "fury swipes",
        "category": "attack",
        "rarity": "medium",
        "cost": 1,
        "target": true,
        "effect": {
            "name": "MultiAttackEffect",
            "type": "normal",
            "playAttackAnim": true,
            "params": {
                "value": 2,
                "modifiers": ["userAttack"],
                "damageTimes": 3,
            }
        },
        "tooltip": 'Deal <span class="damage-amount">§</span> damage to an ennemy 3 times',
    },

    "007": {
        "name": "calm mind",
        "category": "ability",
        "rarity": "medium",
        "cost": 1,
        "target": false,
        "effect": {
            "name": "SelfBuffEffect",
            "type": "psychic",
            "params" : {
                "buffAttack": 1,
                "buffDefense": 1
            }
        },
        "tooltip": 'Raises your attack and defense by 1',
    },

    "008": {
        "name": "recover",
        "category": "ability",
        "rarity": "medium",
        "cost": 1,
        "target": false,
        "effect":{
            "name": "HealEffect",
            "type": "psychic",
            "params": {
                "value": 50,
                "percentage": true
            }
        },
        "tooltip": 'Heals 50% of your hp',
    },

    "009": {
        "name": "turbo",
        "category": "talent",
        "rarity": "medium",
        "cost": 1,
        "target": false,
        "exhaust": true,
        "effect":{
            "name": "AddToTurnEffect",
            "type": "normal",
            "params": {
                "step": "startPlayerTurn",
                "effectToAdd": {
                    "name": "DrawEffect",
                    "type": null,
                    "params": {
                        "value": 1
                    }
                }
            }
        },
        "tooltip": 'At the start of each turn, draw one card',
    },
    "010": {
        "name": "vine whip",
        "category": "attack",
        "rarity": "common",
        "cost": 1,
        "target": true,
        "effect":{
            "name": "AttackEffect",
            "type": "grass",
            "playAttackAnim": true,
            "params": {
                "value": 6,
                "modifiers": ["userAttack"]
            },
        },
        "tooltip": 'Deal <span class="damage-amount">§</span> damage to an ennemy',
    },
    "011": {
        "name": "ember",
        "category": "attack",
        "rarity": "common",
        "cost": 1,
        "target": true,
        "effect":{
            "name": "AttackEffect",
            "type": "fire",
            "playAttackAnim": true,
            "params": {
                "value": 6,
                "modifiers": ["userAttack"]
            },
        },
        "tooltip": 'Deal <span class="damage-amount">§</span> damage to an ennemy',
    },
    "012": {
        "name": "bubble",
        "category": "attack",
        "rarity": "common",
        "cost": 1,
        "target": true,
        "effect":{
            "name": "AttackEffect",
            "type": "water",
            "playAttackAnim": true,
            "params": {
                "value": 6,
                "modifiers": ["userAttack"]
            },
        },
        "tooltip": 'Deal <span class="damage-amount">§</span> damage to an ennemy',
    },
    "013": {
        "name": "power-up punch",
        "category": "attack",
        "rarity": "common",
        "cost": 1,
        "target": true,
        "effect": {
            "name": "MultiEffect",
            "type": "fighting",
            "playAttackAnim": true,
            "params": [
                {
                    "name": "AttackEffect",
                    "params": {
                        "value": 2,
                        "modifiers": ["userAttack"]
                    }
                },
                {
                    "name": "SelfBuffEffect",
                    "params": {
                        "buffAttack": 1,
                    }
                }
            ],
        },
        "tooltip": 'Deal <span class="damage-amount">§</span> damage to an ennemy and raise your attack by 1',
    },
    "014": {
        "name": "steel wing",
        "category": "attack",
        "rarity": "common",
        "cost": 1,
        "target": true,
        "effect": {
            "name": "MultiEffect",
            "type": "steel",
            "playAttackAnim": true,
            "params": [
                {
                    "name": "DrawEffect",
                    "params": {
                        "value": 2,
                    }
                },
                {
                    "name": "SelfBuffEffect",
                    "params" : {
                        "buffAttack": 1,
                        "buffDefense": 1
                    }
                },
                {
                    "name": "MultiAttackEffect",
                    "params": {
                        "value": 3,
                        "modifiers": ["userAttack"],
                        "damageTimes": 3,
                    }
                },
                {
                    "name": "BlockEffect",
                    "params": {
                        "value": 3,
                        "modifiers": ["userDefense"]
                    }
                }
            ],
        },
        "tooltip": 'Deal <span class="damage-amount">§</span> damage to an ennemy and gain µ block',
    },
    "015": {
        "name": "giga drain",
        "category": "attack",
        "rarity": "common",
        "cost": 1,
        "target": true,
        "effect":{
            "name": "AttackEffect",
            "type": "grass",
            "playAttackAnim": true,
            "params": {
                "value": 6,
                "modifiers": ["userAttack"],
                "leechlife":  30
            },
        },
        "tooltip": 'Deal <span class="damage-amount">§</span> damage to an ennemy and heals you for 30% of the damage dealt.',
    },
    "016": {
        "name": "flamethrower",
        "category": "attack",
        "rarity": "common",
        "cost": 1,
        "target": true,
        "effect":{
            "name": "MultiEffect",
            "type": "fire",
            "playAttackAnim": true,
            "params": [
                {
                    "name": "AttackEffect",
                    "params": {
                        "value": 6,
                        "modifiers": ["userAttack", "burnStacks"]
                    }
                },
                {
                    "name": "AddStackEffect",
                    "params": {
                        "type": "burn",
                        "value": 1,
                    }
                }
            ]
        },
        "tooltip": 'Deal <span class="damage-amount">§</span> damage to an ennemy and applies 1 burn stack on it.',
    },
}
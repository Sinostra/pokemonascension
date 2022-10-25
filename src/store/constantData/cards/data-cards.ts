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
            "params": {
                "value": 6,
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
            "params": {
                "value": 3,
                "damageAOE": true,
            }
        },
        "tooltip": 'Deal § damage to all ennemies',
    },

    "003": {
        "name": "agility",
        "category": "ability",
        "rarity": "medium",
        "cost": 0,
        "target": false,
        "effect": {
            "name": "DrawEfffect",
            "type": "psychic",
            "params": {
                "draw": 2,
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
            "name": "BlockEfffect",
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
            "name" : "EnergyEfffect",
            "type": "normal",
            "params": {
                "energy": 2,
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
            "params": {
                "value": 2,
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
            "name": "BuffEfffect",
            "type": "psychic",
            "params" : {
                "buffAttack": 1,
                "buffDefense": 1
            }
        },
        "tooltip": 'Raises your attack and defense by one',
    },

    "008": {
        "name": "recover",
        "category": "ability",
        "rarity": "medium",
        "cost": 1,
        "target": false,
        "effect":{
            "name": "HealEfffect",
            "type": "psychic",
            "params": {
                "selfHeal": 50
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
            "type": "normal",
            "addToStartTurn": {
                "draw": 1
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
            "params": {
                "value": 60,
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
            "params": [
                {
                    "name": "AttackEffect",
                    "params": {
                        "value": 2,
                    }
                },
                {
                    "name": "BuffEfffect",
                    "params": {
                        "buffAttack": 1,
                    }
                }
            ],
        },
        "tooltip": 'Deal <span class="damage-amount">§</span> damage to an ennemy and raise your attack by 1',
    },
}
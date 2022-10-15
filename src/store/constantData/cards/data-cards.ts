export default {
    "001": {
        "name": "thundershock",
        "category": "attack",
        "rarity": "common",
        "cost": 1,
        "target": true,
        "effect": {
            "type": "electric",
            "draw": 0,
            "damage": 6,
            "damageTimes": 1,
            "selfDamage": 0,
            "damageAOE": false,
            "block": 0,
            "ignoreBlock": false,
            "energy": 0,
            "buffSelfAttack": -1,
            "buffSelfDefense": -1,
            "debuffAttack": 2,
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
            "type": "electric",
            "damageTimes": 1,
            "draw": 0,
            "damage": 3,
            "damageAOE": true,
            "block": 0,
            "ignoreBlock": false,
            "energy": 0,
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
            "type": "psychic",
            "draw": 2,
            "damage": 0,
            "damageAOE": false,
            "block": 0,
            "ignoreBlock": false,
            "energy": 0,
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
            "type": "normal",
            "draw": 0,
            "damage": 0,
            "damageAOE": false,
            "block": 5,
            "ignoreBlock": false,
            "energy": 0,
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
            "type": "normal",
            "draw": 0,
            "damage": 0,
            "damageAOE": false,
            "block": 0,
            "ignoreBlock": false,
            "energy": 2,
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
            "type": "normal",
            "draw": 0,
            "damage": 2,
            "damageTimes": 3,
            "damageAOE": false,
            "block": 0,
            "ignoreBlock": false,
            "energy": 0,
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
            "type": "psychic",
            "buffSelfAttack": 1,
            "buffSelfDefense": 1,
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
            "type": "psychic",
            "selfHeal": 50
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
            "type": "grass",
            "damage": 6,
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
            "type": "fire",
            "damage": 60,
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
            "type": "water",
            "damage": 6,
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
                    "effectName": "AttackEffect",
                    "effectParams": {
                        "damage": 2,
                    }
                },
                {
                    "effectName": "BuffEfffect",
                    "effectParams": {
                        "attack": 1,
                    }
                }
            ],
        },
        "tooltip": 'Deal <span class="damage-amount">§</span> damage to an ennemy and raise your attack by 1',
    },
}
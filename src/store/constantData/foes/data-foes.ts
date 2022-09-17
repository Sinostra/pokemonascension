export default [
    [
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
                        damage: 2,
                        type: 'noraml',
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
    ]
]
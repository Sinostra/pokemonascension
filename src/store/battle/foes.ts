export default {
    state: {
        foeTeam: [
            {
                id: '017',
                maxHealth: 50,
                patternSetting: {
                    pattern: [
                        {
                            'damage': 1,
                            'block': 2,
                            'type': 'normal',
                            'damageTimes': 3,
                        },
                        {
                            'damage': 1,
                            'block': 2,
                            'type': 'normal',
                            'damageTimes': 3,
                        },
                        {
                            'damage': 1,
                            'block': 2,
                            'type': 'normal',
                            'damageTimes': 3,
                        }
                    ]
                }
            },
            {
                id: '104',
                maxHealth: 55,
                patternSetting: {
                    pattern: [
                        {
                            'damage': 1,
                            'block': 2,
                            'type': 'normal'
                        },
                        {
                            'damage': 3,
                            'block': 0,
                            'type': 'water'
                        },
                        {
                            'damage': 0,
                            'block': 3,
                            'type': 'normal'
                        }
                    ],
                }
            },
            {
                id: '009',
                maxHealth: 60,
                patternSetting: {
                    pattern: [
                        {
                            'damage': 0,
                            'block': 4,
                            'type': 'normal'
                        },
                        {
                            'damage': 4,
                            'block': 0,
                            'type': 'water'
                        },
                        [
                            {
                                'damage': 3,
                                'block': 0,
                                'type': 'normal'
                            },
                            {
                                'damage': 2,
                                'block': 2,
                                'type': 'normal'
                            }
                        ],
                    ],
                    patternIndexToRandomise: [0,1]
                }
            }
        ]
    },

    mutations: {

    },

    actions: {

    }
}
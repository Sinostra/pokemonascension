export default {
    state: {
        currentEnergy: 0,
        maxEnergy: 3,
        selectedCard: null,
        draggedCard: null,
        turnCounter: 0,
        playerStats: {
            attack: 0,
            defense: 0
        },
        indexFoeHover: null,
        isBattleOngoing: false,
        displayBattleRewards: false,
        playerLost: false,
        currentWeather: '',
        mouseCoordinates: {
            x: 0,
            y: 0
        }
    },
    mutations: {
        getEnergy(state, amount: number) {
            state.currentEnergy += amount
        },

        spendEnergy(state, amount: number) {
            state.currentEnergy -= amount
        },

        setEnergy(state, amount: number) {
            state.currentEnergy = amount
        },

        selectCard(state, value) {
            state.selectedCard = value
        },

        dragCard(state, value) {
            state.draggedCard = value
        },

        startNewTurn(state) {
            state.turnCounter++
        },

        setPlayerAttack(state, amount) {
            state.playerStats.attack = amount
        },

        setPlayerDefense(state, amount) {
            state.playerStats.defense = amount
        },

        buffPlayerAttack(state, amount) {
            state.playerStats.attack += amount
        },

        buffPlayerDefense(state, amount) {
            state.playerStats.defense += amount
        },

        mouseOver(state, types) {
            state.indexFoeHover = types
        },

        startBattle(state) {
            state.isBattleOngoing = true
        },
        stopBattle(state) {
            state.isBattleOngoing = false
            state.turnCounter = 0
        },
        displayBattleRewards(state) {
            state.displayBattleRewards = true
        },
        stopDisplayBattleRewards(state) {
            state.displayBattleRewards = false
        },
        playerLost(state) {
            state.playerLost = true
        },
        resetPlayerStatus(state) {
            state.playerLost = false
        },
        setWeather(state, weather) {
            state.currentWeather = weather 
        },
        updateMouseCoordinates(state, coords) {
            state.mouseCoordinates.x = coords.x
            state.mouseCoordinates.y = coords.y
        }
    },
    getters: {
        selectedCard: state => {
            return state.selectedCard
        },
        mouseCoordinates: state => {
            return state.mouseCoordinates
        }
    }
}
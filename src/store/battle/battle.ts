export default {
    state: {
        backgroundUsed: 'starter_background',
        currentEnergy: 3,
        maxEnergy: 3,
        selectedCard: null,
        draggedCard: null,
        turnCounter: 0,
        playerAttack: 0,
        playerDefense: 0,
        typesHover: null,
        isBattleOngoing: false,
        displayBattleRewards: false,
        playerLost: false,
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
            state.playerAttack = amount
        },

        setPlayerDefense(state, amount) {
            state.playerDefense = amount
        },

        buffPlayerAttack(state, amount) {
            state.playerAttack += amount
        },

        buffPlayerDefense(state, amount) {
            state.playerDefense += amount
        },

        deBuffPlayerAttack(state, amount) {
            state.playerAttack -= amount
        },

        deBuffPlayerDefense(state, amount) {
            state.playerDefense -= amount
        },

        mouseOver(state, types) {
            state.typesHover = types
        },

        startBattle(state, background) {
            state.backgroundUsed = background
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
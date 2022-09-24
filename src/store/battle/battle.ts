export default {
    state: {
        backgroundUsed: 'starter_background',
        currentEnergy: 3,
        maxEnergy: 3,
        selectedCard: null,
        turnCounter: 0,
        playerAttack: 0,
        playerDefense: 0,
        typesHover: null,
        isBattleOngoing: false
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
        }
    },
    actions: {

        getEnergy(context, amount: number) {
            context.commit("getEnergy", amount)
        },

        spendEnergy(context, amount: number) {
            context.commit("spendEnergy", amount)
        },

        setEnergy(context, amount: number) {
            context.commit("setEnergy", amount)
        },

        selectCard(context, value) {
            context.commit("selectCard", value)
        },
        startNewTurn(context) {
            context.commit("startNewTurn")
        },

        setPlayerAttack(context, amount) {
            context.commit("setPlayerAttack", amount)
        },

        setPlayerDefense(context, amount) {
            context.commit("setPlayerDefense", amount)
        },

        buffPlayerAttack(context, amount) {
            context.commit("buffPlayerAttack", amount)
        },

        buffPlayerDefense(context, amount) {
            context.commit("buffPlayerDefense", amount)
        },

        deBuffPlayerAttack(context, amount) {
            context.commit("deBuffPlayerAttack", amount)
        },

        deBuffPlayerDefense(context, amount) {
            context.commit("deBuffPlayerDefense", amount)
        },

        mouseOver(context, types) {
            context.commit("mouseOver", types)
        },

        startBattle(context, background) {
            context.commit("startBattle", background)
        },

        stopBattle(context) {
            context.commit("stopBattle")
        },

        buffFoeAttack() {},
        buffFoeDefense() {},

        deBuffFoeAttack() {},
        deBuffFoeDefense() {},

        playerTurn() {},
        endPlayerTurn() {},
        foeTurn() {},

        foePokemonHasBeenClicked() {},
        playCurrentlySelectedCard() {},
        discardCurrentlySelectedCard() {},
        rightClick() {},

        cardToBeDrawn() {},
        drawIsDone() {},

        damageAllFoes() {},
        damage() {},
        heal() {},
        playFoeMove() {},
        gainBlock() {},
    },
    getters: {
        selectedCard: state => {
            return state.selectedCard
        }
    }
}
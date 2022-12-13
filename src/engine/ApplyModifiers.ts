import cloneDeep from "lodash.clonedeep"

export default function applyModifiers(baseEffect, user, target, store) {
    const effect = cloneDeep(baseEffect)
    if(effect.name !== "MultiEffect") {
        if(!effect.params.modifiers) {
            return effect
        }

        let resolvedModifiers = 0
        const attackStat = 'attack'
        const defenseStat = 'defense'

        // const attackStat = reversedStats ? 'defense' : 'attack'
        // const defenseStat = reversedStats ? 'attack' : 'defense'

        resolvedModifiers = effect.params.modifiers.map((modifier) => {
            if(user === "player") {
                switch(modifier) {
                    case 'userAttack': return store.state.battle.playerStats[attackStat]
                    case 'userDefense': return store.state.battle.playerStats[defenseStat]
                    case 'targetAttack': return target !== null ? store.getters.getFoeTeam[target as number]['stats'][attackStat] : 0
                    case 'targetDefense': return target !== null ? store.getters.getFoeTeam[target as number]['stats'][defenseStat] : 0
                    case 'burnStacks': return target !== null && store.getters.getFoeTeam[target as number]['stacks']['burn'] ? store.getters.getFoeTeam[target as number]['stacks']['burn'] : 0
                }
            }
            else {
                switch(modifier) {
                    case 'userAttack': return store.getters.getFoeTeam[user as number]['stats'][attackStat]
                    case 'userDefense': return store.getters.getFoeTeam[user as number]['stats'][defenseStat]
                    case 'targetAttack': return target !== null ? store.state.battle.playerStats[attackStat] : 0
                    case 'targetDefense': return target !== null ? store.state.battle.playerStats[defenseStat] : 0
                    case 'burnStacks': return target !== null && store.state.battle.playerStats['stacks']['burn'] ? store.state.battle.playerStats['stacks']['burn'] : 0
                }
            }
            
        }).reduce((prev, next) => prev + next)

        effect.params.value += resolvedModifiers
    }

    else {
        effect.params = effect.params.map((subEffect) => {
            return applyModifiers(subEffect, user, target, store)
        })
    }

    return effect
}
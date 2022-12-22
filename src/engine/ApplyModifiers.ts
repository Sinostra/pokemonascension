import cloneDeep from "lodash.clonedeep"

export default function applyModifiers(baseEffect, user, target, battle) {
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
                    case 'userAttack': return battle.pokemon.player[battle.activePlayerIndex].stats[attackStat]
                    case 'userDefense': return battle.pokemon.player[battle.activePlayerIndex].stats[defenseStat]
                    case 'targetAttack': return target !== null ? battle.pokemon.foes[target as number]['stats'][attackStat] : 0
                    case 'targetDefense': return target !== null ? battle.pokemon.foes[target as number]['stats'][defenseStat] : 0
                    case 'burnStacks': return target !== null && battle.pokemon.foes[target as number]['stacks']['burn'] ? battle.pokemon.foes[target as number]['stacks']['burn'] : 0
                }
            }
            else {
                switch(modifier) {
                    case 'userAttack': return battle.pokemon.foes[user as number]['stats'][attackStat]
                    case 'userDefense': return battle.pokemon.foes[user as number]['stats'][defenseStat]
                    case 'targetAttack': return target !== null ? battle.pokemon.player[battle.activePlayerIndex].stats[attackStat] : 0
                    case 'targetDefense': return target !== null ? battle.pokemon.player[battle.activePlayerIndex].stats[defenseStat] : 0
                    case 'burnStacks': return target !== null && battle.pokemon.player[battle.activePlayerIndex]['stacks']['burn'] ? battle.pokemon.player[battle.activePlayerIndex]['stacks']['burn'] : 0
                }
            }
            
        }).reduce((prev, next) => prev + next)

        effect.params.value += resolvedModifiers
    }

    else {
        effect.params = effect.params.map((subEffect) => {
            return applyModifiers(subEffect, user, target, battle)
        })
    }

    return effect
}
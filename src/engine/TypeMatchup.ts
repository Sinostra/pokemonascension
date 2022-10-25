import typeMatchups from "./Types"

export default function getTypeMatchup(attackingType, defendingTypes) {

    const offensiveTypeMatchups = typeMatchups

    const attackMachups = offensiveTypeMatchups[attackingType]
    let multiplier = 1

    defendingTypes.forEach((type) => {
        multiplier *= attackMachups[type]
    })

    return multiplier
}
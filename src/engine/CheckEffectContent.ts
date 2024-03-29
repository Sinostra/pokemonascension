export default function checkEffectContent(effect, name) {
    if(effect.name === name) {
        return effect
    }
    let foundEffect = undefined
    if(effect.name === "MultiEffect") {
        foundEffect = effect.params.find((e) => e.name === name)
    }
    return foundEffect
}
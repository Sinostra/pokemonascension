export interface IEffect {
  playEffect(): Promise<void>
}

class BaseEffect {
  constructor(params, emitter) {
    this.params = params
    this.emitter = emitter
  }
  public emitter
  public params
}

export class AttackEffect extends BaseEffect implements IEffect {
  playEffect(): Promise<void> {
    return new Promise((resolve) => {
      this.emitter.emit("damage", this.params)
      resolve()
    })
  }
}

export class BlockEffect extends BaseEffect implements IEffect {
  playEffect(): Promise<void> {
    return new Promise((resolve) => {
      this.emitter.emit("block", this.params)
      resolve()
    })
  }
}

export class HealEffect extends BaseEffect implements IEffect {
  playEffect(): Promise<void> {
    return new Promise((resolve) => {
      this.emitter.emit("heal", this.params)
      resolve()
    })
  }
}

export class SelfDamageEffect extends BaseEffect implements IEffect {
  playEffect(): Promise<void> {
    return new Promise((resolve) => {
      this.emitter.emit("selfdamage", this.params)
      resolve()
    })
  }
}

export class SelfBuffEffect extends BaseEffect implements IEffect {
  playEffect(): Promise<void> {
    return new Promise((resolve) => {
      this.emitter.emit("selfbuff", this.params)
      resolve()
    })
  }
}

export class TargetBuffEffect extends BaseEffect implements IEffect {
  playEffect(): Promise<void> {
    return new Promise((resolve) => {
      this.emitter.emit("targetbuff", this.params)
      resolve()
    })
  }
}

export class EnergyEffect extends BaseEffect implements IEffect {
  playEffect(): Promise<void> {
    return new Promise((resolve) => {
      this.emitter.emit("energy", this.params)
      resolve()
    })
  }
}

export class DrawEffect extends BaseEffect implements IEffect {
  playEffect(): Promise<void> {
    return new Promise((resolve) => {

      const resolvePromise = () => {
        resolve()
        clearEmitter()
      } 

      this.emitter.on("drawIsDone", resolvePromise)

      const clearEmitter = () => {
        this.emitter.off("drawIsDone", resolvePromise)
      }

      this.emitter.emit("draw", this.params)
      
    })
  }
}

export class AddStack extends BaseEffect implements IEffect {
  playEffect(): Promise<void> {
    return new Promise((resolve) => {
      this.emitter.emit("addStack", this.params)
      resolve()
    })
  }
}

export class MultiAttackEffect extends BaseEffect implements IEffect {
  playEffect(): Promise<void> {
    return new Promise((resolve) => {

      const attacks: AttackEffect[] = Array(this.params.damageTimes).fill(new AttackEffect(this.params, this.emitter))

      const playAttack = (attack: AttackEffect, delay): Promise<void> => {
        return new Promise((resolve) => {
          setTimeout(() => {
            attack.playEffect().then(() => {
              resolve()
            })
          }, delay)
        })
      }

      const playAllAttacks = (index, bool = true): Promise<void> => {
        return new Promise((resolve) => {

          let canAttack =  true

          const clearEmitter = () => {
            this.emitter.off("fainted", checkFainted)
          }
  
          const resolvePromise = () => {
            resolve()
            clearEmitter()
          }

          const checkFainted = (payload) => {
            if(payload === this.params.user || payload === this.params.target) {
              canAttack = false
            }
          }

          this.emitter.on("fainted", checkFainted)

          let currentIndex = index
          const delay = index === 0 ? 0 : 500
          if(currentIndex >= attacks.length || !bool) {
            resolvePromise()
          }

          else {
            playAttack(attacks[currentIndex], delay).then(() => {
              currentIndex++
              playAllAttacks(currentIndex, canAttack).then(() => {
                resolvePromise()
              })
            })
          }
        })
      }

      playAllAttacks(0).then(() => {
        resolve()
      })
    })
  }
}

export class AddToTurnEffect extends BaseEffect implements IEffect {
  playEffect(): Promise<void> {
    return new Promise((resolve) => {
      this.emitter.emit("addToTurn", this.params)
      resolve()
    })
  }
}

export class MultiEffect extends BaseEffect implements IEffect {
  playEffect(): Promise<void> {
    const subEffects = Object.values(this.params).filter((val) => typeof val === 'object')
    const effects = subEffects.map((effect) => {
      return {
        effect,
        user: this.params.user,
        target: this.params.target,
        type: this.params.type,
      }
    }).map((e) => {
      const effect = e.effect as any
      return new EffectContainer[effect.name]({user: e.user, target: e.target, type: e.type, ...effect.params}, this.emitter)
    })
    
    return new Promise((resolve) => {
      Promise.all(effects.map((effect) => effect.playEffect())).then(() => {
        resolve()
      })
    })
  }
}

export const EffectContainer: any = {
  MultiEffect,
  MultiAttackEffect,
  AttackEffect,
  AddToTurnEffect,
  BlockEffect,
  HealEffect,
  SelfDamageEffect,
  SelfBuffEffect,
  TargetBuffEffect,
  EnergyEffect,
  DrawEffect
}
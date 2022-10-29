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

      const clearEmitter = () => {
        this.emitter.off("drawIsDone", resolvePromise)
      }

      const resolvePromise = () => {
        resolve()
        clearEmitter()
      } 

      this.emitter.emit("draw", this.params)
      this.emitter.on("drawIsDone", resolvePromise)
    })
  }
}

export class MultiAttackEffect extends BaseEffect implements IEffect {
  playEffect(): Promise<void> {
    return new Promise((resolve) => {
      const attacks: AttackEffect[] = []
      for(let i = 0; i < this.params.damageTimes; i++) {
        attacks.push(new AttackEffect(this.params, this.emitter))
      }

      const playAttack = (attack: AttackEffect, delay): Promise<void> => {
        return new Promise((resolve) => {
          setTimeout(() => {
            attack.playEffect().then(() => {
              resolve()
            })
          }, delay)
        })
      }

      const playAllAttacks = (index): Promise<void> => {
        return new Promise((resolve) => {
          let currentIndex = index
          const delay = index === 0 ? 0 : 500
          if(currentIndex >= attacks.length) {
            resolve()
          }

          else {
            playAttack(attacks[currentIndex], delay).then(() => {
              currentIndex++
              playAllAttacks(currentIndex).then(() => {
                resolve()
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

export class MultiEffect extends BaseEffect implements IEffect {
  playEffect(): Promise<void> {
    const subEffects = Object.values(this.params).filter((val) => typeof val === 'object')
    const effects = subEffects.map((effect) => {
      return {
        effect,
        ...{
          user: this.params.user,
          target: this.params.target,
          type: this.params.type,
        }
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
  BlockEffect,
  HealEffect,
  SelfBuffEffect,
  TargetBuffEffect,
  EnergyEffect,
  DrawEffect
}
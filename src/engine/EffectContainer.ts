import { inject } from 'vue'

export interface IEffect {
  playEffect(): Promise<void>
}

class BaseEffect {
  constructor(params) {
    this.params = params
  }
  protected emitter: any = inject('emitter')
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

export class BlockEfffect extends BaseEffect implements IEffect {
  playEffect(): Promise<void> {
    return new Promise((resolve) => {
      this.emitter.emit("block", this.params)
      resolve()
    })
  }
}

export class HealEfffect extends BaseEffect implements IEffect {
  playEffect(): Promise<void> {
    return new Promise((resolve) => {
      this.emitter.emit("heal", this.params)
      resolve()
    })
  }
}

export class BuffEfffect extends BaseEffect implements IEffect {
  playEffect(): Promise<void> {
    return new Promise((resolve) => {
      this.emitter.emit("buff", this.params)
      resolve()
    })
  }
}

export class EnergyEfffect extends BaseEffect implements IEffect {
  playEffect(): Promise<void> {
    return new Promise((resolve) => {
      this.emitter.emit("energy", this.params)
      resolve()
    })
  }
}

export class DrawEfffect extends BaseEffect implements IEffect {
  playEffect(): Promise<void> {
    return new Promise((resolve) => {

      const clearEmitter = () => {
        this.emitter.all.clear()
        resolve()
      }

      this.emitter.emit("draw", this.params)
      this.emitter.on("drawIsDone", clearEmitter)
    })
  }
}

export class MultiAttackEffect extends BaseEffect implements IEffect {
  playEffect(): Promise<void> {
    return new Promise((resolve) => {
      const attacks: AttackEffect[] = []
      for(let i = 0; i < this.params.damageTimes; i++) {
        attacks.push(new AttackEffect(this.params))
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

export class MultiEffect implements IEffect {
  constructor(effects) {
    this.effects = effects
  }
  private effects: IEffect[] = []
  playEffect(): Promise<void> {
    return new Promise((resolve) => {
      Promise.all(this.effects.map((effect) => effect.playEffect())).then(() => {
        resolve()
      })
    })
  }
}

export const EffectContainer: any = {
  MultiEffect,
  MultiAttackEffect,
  AttackEffect,
  BlockEfffect,
  HealEfffect,
  BuffEfffect,
  EnergyEfffect,
  DrawEfffect
}
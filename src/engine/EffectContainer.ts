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
      console.log('x damage dealt')
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
      this.emitter.emit("draw", this.params)
      this.emitter.on("drawIsDone", resolve())
      // this.emitter.off("drawIsDone", resolve())
    })
  }
}

export class MultiAttackEffect  extends BaseEffect implements IEffect {
  playEffect(): Promise<void> {
    return new Promise((resolve) => {
      const attacks: AttackEffect[] = []
      const attackDelay: number = 500
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
          const delay = index === 0 ? 0 : attackDelay
          if(!attacks[currentIndex]) {
            resolve()
          }
          else {
            playAttack(attacks[currentIndex], delay).then(() => {
              currentIndex++
              playAllAttacks(currentIndex)
            })
          }
        })
      }

      playAllAttacks(0).then(() => {
        console.log('all attacks have been played')
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
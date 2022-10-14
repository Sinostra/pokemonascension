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
      this.emitter.emit("draw", this.params)
      this.emitter.on("drawIsDone", resolve())
      // this.emitter.off("drawIsDone", resolve())
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
  AttackEffect,
  BlockEfffect,
  HealEfffect,
  BuffEfffect,
  EnergyEfffect,
  DrawEfffect
}
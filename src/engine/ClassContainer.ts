import { inject } from 'vue'

export interface IEffect {
  playEffect(): void
}

class BaseEffect {
  constructor(params) {
    this.params = params
  }
  protected emitter: any = inject('emitter')
  public params
}

export class AttackEffect extends BaseEffect implements IEffect {
  playEffect() {
    this.emitter.emit("damage", this.params)
  }
}

export const ClassContainer: any = {
  AttackEffect
}
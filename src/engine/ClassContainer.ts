import { inject } from 'vue'

export interface IEffect {
  params: any
  playEffect(): void
}


export class Tesla {
    constructor(private ai: string) {
      console.log(`${ai} is driving Tesla`);
    }
}

export class Audi {
    constructor(private ai: string) {
      console.log(`${ai} is driving Audi`);
    }
}

export class AttackEffect implements IEffect {
  constructor(params) {
    this.params = params
  }
  private emitter: any = inject('emitter')
  params

  playEffect() {
    this.emitter.emit("damage", this.params)
  }
}

export const ClassContainer: any = {
    Tesla,
    Audi,
    AttackEffect
}
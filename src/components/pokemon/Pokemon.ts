import { Options, Vue } from 'vue-class-component';
import dataDex from "@/store/constantData/pokedex/data-dex"

@Options({
  props: {
    id: String,
  }
})

export default class Pokemon extends Vue {
  protected id!: string
  protected dataPokemon = dataDex[this.id]

  protected currentHealth: number = 0;
  protected maxHealth: number = this.dataPokemon.baseStats.hp
  protected attack: number = this.dataPokemon.baseStats.attack
  protected defense: number = this.dataPokemon.baseStats.defense

  protected block: number = 0;

  protected isPlayingAttackAnim: boolean = false
  protected isPlayingReturnAnim: boolean = false

  protected mouseOver: boolean = false

  protected fainted: boolean = false


  get spritePath() {
    return require(`@/assets/img/sprites/${this.$store.state.settings.pokemonSpritesExtension}/${this.id}.${this.$store.state.settings.pokemonSpritesExtension}`)
  }

  get wrapperClass(): string {
    const hoverClass = this.mouseOver ? 'hover' : ''
    let animClass: string = ''
    if(this.isPlayingReturnAnim) animClass = 'return'
    else if (this.isPlayingAttackAnim) animClass = 'attack' 
    return `${hoverClass} ${animClass}`
  }

  get healthBarClass(): string {
    if(this.getHealthBarPercent() > 67) return 'green'
    else if(this.getHealthBarPercent() > 33 && this.getHealthBarPercent() <= 67) return 'orange'
    else return 'red'
  }

  get allTypesMatchups() {
    const pokemonTypes = this.dataPokemon['type']
    const allTypes = this.$store.state.types.dataTypes
    return Object.keys(allTypes).reduce((recipient, type) => {
      let multiplier = 1
      pokemonTypes.forEach(t => {
        const currentMultiplier = allTypes[type][t]
        multiplier *= currentMultiplier
      });
      recipient[type] = multiplier
      return recipient
    }, {
      "grass": 1,
      "fire": 1,
      "water": 1,
      "electric": 1,
      "ground": 1,
      "rock": 1,
      "psychic": 1,
      "ghost": 1,
      "dark": 1,
      "fighting": 1,
      "fairy": 1,
      "steel": 1,
      "normal": 1,
      "flying": 1,
      "ice": 1,
      "dragon": 1,
      "poison": 1,
      "bug": 1
    })
  }

  get weaknesses() {
    const allTypes = this.$store.state.types.dataTypes
    return Object.keys(allTypes).reduce((recipient, type) => {
      if(this.allTypesMatchups[type] > 1) {
        recipient.push(type)
      }
      return recipient
    }, [] as string[])
  }

  get resistances() {
    const allTypes = this.$store.state.types.dataTypes
    return Object.keys(allTypes).reduce((recipient, type) => {
      if(this.allTypesMatchups[type] < 1) {
        recipient.push(type)
      }
      return recipient
    }, [] as string[])
  }

  get armorBarPercent() {
    const armorPercent = (this.block  / this.maxHealth) * 100;
    if(armorPercent <= 100) return armorPercent
    else return 100
  }

  getTypeMatchup(attackingType, defendingTypes) {
    const attackMachups = this.$store.state.types.dataTypes[attackingType]
    let multiplier = 1

    defendingTypes.forEach((type) => {
      multiplier *= attackMachups[type]
    })

    return multiplier
  }

  protected takeDamage(amount: number, type: string | null, ignoreBlock: boolean = false): void {

    //Type de l'attaque null dans le cas de selfDamage
    //Application des faiblesses et résistances avant l'attaque pour éviter que l'armure ne soit prise en compte
    const typeMultiplier = type ? this.getTypeMatchup(type, this.dataPokemon.type) : 1
    if(typeMultiplier < 1 ) amount = Math.floor(amount * typeMultiplier)
    else amount = Math.ceil(amount * typeMultiplier)
    let damageDealt: number = 0

    if(!ignoreBlock && this.block > 0) {
      if(this.block >= amount) {
        this.block -= amount
      }

      else {
        damageDealt = amount - this.block
        this.block = 0
      }
    }

    else {
      damageDealt = amount
    }

    if(this.currentHealth > damageDealt) {
      this.currentHealth -= damageDealt
    }

    else {
      this.currentHealth = 0
      this.fainted = true
      this.playReturnAnim()
    }
  }

  protected heal(amount: number) {
    const projectedHealthAmount = this.currentHealth + Math.floor((this.maxHealth * (amount / 100)))
    if(projectedHealthAmount > this.maxHealth) this.currentHealth = this.maxHealth
    else this.currentHealth = projectedHealthAmount
  }

  protected gainBlock(amount: number) {
    this.block += amount
  }

  protected setBlock(amount: number) {
    this.block = amount
  }

  protected getTpyeIcon(type) {
    return require(`@/assets/img/types/${type}.png`)
  }

  protected getHealthBarPercent(): number {
    return (this.currentHealth  / this.maxHealth) * 100;
  }

  protected getFontSize(multiplier = 1): string {
    return `font-size: ${(this.$store.state.settings.baseFontSize) * multiplier}px;`
  }

  protected playAttackAnim(): void {
    if(!this.isPlayingAttackAnim) {
      this.isPlayingAttackAnim = true
      setTimeout(() => { this.isPlayingAttackAnim = false }, 350 )
    }
  }

  protected playReturnAnim(): void {
    if(!this.isPlayingReturnAnim) {
      this.isPlayingReturnAnim = true
    }
  }

  get swordIcon() {
    return require(`@/assets/img/interface/sword.png`)
  }

  public mounted() {
    this.currentHealth = this.maxHealth
  }

}

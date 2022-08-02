import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    id: String,
  }
})

export default class Pokemon extends Vue {
  protected id!: string
  protected currentHealth: number = 0;
  protected block: number = 0;
  protected isPlayingAttackAnim: boolean = false
  protected isPlayingReturnAnim: boolean = false

  protected fainted: boolean = false


  get spritePath() {
    return require(`./../../assets/img/sprites/${this.$store.state.settings.pokemonSpritesExtension}/${this.id}.${this.$store.state.settings.pokemonSpritesExtension}`)
  }

  get animClass(): string {
    let animClass: string = ''
    if(this.isPlayingReturnAnim) animClass = 'return'
    else if (this.isPlayingAttackAnim) animClass = 'attack' 
    return animClass
  }

  get maxHealth(): number {
    return this.$store.state.pokedex.constantDex[this.id].hp
  }

  get healthBarClass(): string {
    if(this.getHealthBarPercent() > 67) return 'green'
    else if(this.getHealthBarPercent() > 33 && this.getHealthBarPercent() <= 67) return 'orange'
    else return 'red'
  }

  getTypeMatchup(attackingType) {
    const defenderTypes = this.$store.state.pokedex.constantDex[this.id]['type']
    const attackMachups = this.$store.state.types.dataTypes[attackingType]
    let multiplier = 1

    defenderTypes.forEach((type) => {
      multiplier *= attackMachups[type]
    })

    return multiplier
  }

  public mounted() {
    this.currentHealth = this.maxHealth
  }

  protected takeDamage(amount: number, type: string, ignoreBlock: boolean = false): void {

    //Application des faiblesses et résistances avant l'attaque pour éviter que l'armure ne soit prise en compte
    amount = Math.ceil(amount * this.getTypeMatchup(type))
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
    const projectedHealthAmount = this.currentHealth + amount
    if(projectedHealthAmount > this.maxHealth) this.currentHealth = this.maxHealth
    else this.currentHealth = projectedHealthAmount
  }

  protected getPokemonTpyeIcon(type) {
    return require('../../assets/img/types/' + type + '.png')
  }

  protected getHealthBarPercent(): number {
    return (this.currentHealth  / this.maxHealth) * 100;
  }

  protected getFontSize(multiplier = 1): string {
    return 'font-size: ' + (this.$store.state.settings.baseFontSize) * multiplier + 'px;'
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

}

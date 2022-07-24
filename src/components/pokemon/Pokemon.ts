import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    id: String,
  }
})

export default class Pokemon extends Vue {
  protected id!: string
  protected currentHealth!: number;
  protected isPlayingAttackAnim: boolean = false
  protected isPlayingReturnAnim: boolean = false


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

  get healthBarPercent(): number {
    return (this.currentHealth  / this.maxHealth) * 100;
  }

  get healthBarClass(): string {
    if(this.healthBarPercent > 67) return 'green'
    else if(this.healthBarPercent > 33 && this.healthBarPercent <= 67) return 'orange'
    else return 'red'
  }

  public mounted() {
    this.currentHealth = this.maxHealth
  }

  private playAttackAnim(): void {
    if(!this.isPlayingAttackAnim) {
      this.isPlayingAttackAnim = true
      setTimeout(() => { this.isPlayingAttackAnim = false }, 350 )
    }
  }

  private playReturnAnim(): void {
    if(!this.isPlayingReturnAnim) {
      this.isPlayingReturnAnim = true
    }
  }

}

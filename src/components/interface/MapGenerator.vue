<script lang="ts">
import { Vue } from 'vue-class-component'
import { inject } from 'vue'
import cloneDeep from "lodash.clonedeep"

enum RoomType {
    BATTLE,
    ELITEBATTLE,
    UNKNOWN,
    SHOP,
    PKMCENTR,
    CHEST,
    BOSS
}

export default class MapGenerator extends Vue {
    private emitter: any = inject('emitter')
    private mapLength = 10
    private currentMap: number[][] = []

    private generateMap() {
        for(let i = 0; i < this.mapLength; i++) {

            let currentFloor: number[] = []

            //Première itération, début du chemin
            if(i === 0) {
                for(let j = 0; j < 3; j++) {
                    currentFloor.push(RoomType.BATTLE)
                }
            }

            //Dernière itération, ajout du boss
            else if(i === this.mapLength -1) {
                currentFloor.push(RoomType.BOSS)
            }

            else {
                const rand = Math.random()
                const roomsAmount = rand <= 0.33 ? 2 : rand > 0.33 && rand < 0.66 ? 3 : 4
                //Itération au milieu de la carte, que des coffres
                if(i === 4) {
                    for(let j = 0; j < roomsAmount; j++) {
                        currentFloor.push(RoomType.CHEST)
                    }
                }
                //Itération juste avant le boss, que des centres pokémon
                else if(i === this.mapLength -2) {
                    for(let j = 0; j < roomsAmount; j++) {
                        currentFloor.push(RoomType.PKMCENTR)
                    }
                }
                else {
                    //Salle au hasard entre : BATTLE, UNKNOWN, SHOP, PKMCENTR, ELITEBATTLE
                    
                    for(let j = 0; j < roomsAmount; j++) {
                        const random = Math.random()
                        let randRoom
                        if(random <= 0.45) randRoom = 0
                        else if(random > 0.45 && random <= 0.70) randRoom = 2
                        else if(random > 0.70 && random <= 0.80) randRoom = 3
                        else if(random > 0.80 && random <= 0.90) randRoom = 4
                        else if(random > 0.90) randRoom = 1
                        currentFloor.push(randRoom)
                    }
                }
                
            }

            this.currentMap.push(currentFloor)
            this.$emit("mapGenerated", this.currentMap)
        }
    }

    public mounted() {
        this.generateMap()
    }
}
</script>
<style lang="scss" scoped>
@import './style/afterBattleModal.scss';
</style>
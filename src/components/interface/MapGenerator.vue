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

interface Room {
    type: RoomType
    encounterId?: number
    eventId?: number
    connections: number[]
}

export default class MapGenerator extends Vue {
    private emitter: any = inject('emitter')
    private mapLength = 10
    private currentMap: Room[][] = []

    private generateMap() {
        for(let i = 0; i < this.mapLength; i++) {

            let currentFloor: Room[] = []
            const connections = []

            //Première itération, début du chemin
            if(i === 0) {
                for(let j = 0; j < 3; j++) {
                    currentFloor.push({type: RoomType.BATTLE, connections})
                }
            }

            //Dernière itération, ajout du boss
            else if(i === this.mapLength -1) {
                currentFloor.push({type: RoomType.BOSS, connections})
            }

            else {
                const rand = Math.random()
                const roomsAmount = rand <= 0.33 ? 2 : rand > 0.33 && rand < 0.66 ? 3 : 4
                //Itération au milieu de la carte, que des coffres
                if(i === Math.floor(this.mapLength / 2) - 1) {
                    for(let j = 0; j < roomsAmount; j++) {
                        currentFloor.push({type: RoomType.CHEST, connections})
                    }
                }
                //Itération juste avant le boss, que des centres pokémon
                else if(i === this.mapLength -2) {
                    for(let j = 0; j < roomsAmount; j++) {
                        currentFloor.push({type: RoomType.PKMCENTR, connections})
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
                        currentFloor.push({type: randRoom, connections})
                    }
                }
                
            }

            this.currentMap.push(currentFloor)
            this.$emit("mapGenerated", this.currentMap)
        }
    }

    public generatePaths() {
        for(let i = 0; i < this.mapLength - 1; i++) {
            const currentFloor = this.currentMap[i]
            const nextFloor= this.currentMap[i + 1]

            const roomsDiff = currentFloor.length - nextFloor.length

            currentFloor.forEach((room, index) => {
                if(roomsDiff === 0) {
                    room.connections = [index]
                }
            })
        }
    }

    public mounted() {
        this.generateMap()
        this.generatePaths()
    }
}
</script>
<style lang="scss" scoped>
@import './style/afterBattleModal.scss';
</style>
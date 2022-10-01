<script lang="ts">
import { Options, Vue } from 'vue-class-component'
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
    floor: number
    index: number
    encounterId?: number
    eventId?: number
    connections: number[]
}

@Options({
    name: "MapGenerator",
})
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
                    currentFloor.push({type: RoomType.BATTLE, floor: i, index: j, connections})
                }
            }

            //Dernière itération, ajout du boss
            else if(i === this.mapLength -1) {
                currentFloor.push({type: RoomType.BOSS, floor: i, index: 0, connections})
            }

            else {
                const rand = Math.random()
                const roomsAmount = rand <= 0.33 ? 2 : rand > 0.33 && rand < 0.66 ? 3 : 4
                //Itération au milieu de la carte, que des coffres
                if(i === Math.floor(this.mapLength / 2) - 1) {
                    for(let j = 0; j < roomsAmount; j++) {
                        currentFloor.push({type: RoomType.CHEST, floor: i, index: j, connections})
                    }
                }
                //Itération juste avant le boss, que des centres pokémon
                else if(i === this.mapLength -2) {
                    for(let j = 0; j < roomsAmount; j++) {
                        currentFloor.push({type: RoomType.PKMCENTR, floor: i, index: j, connections})
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
                        currentFloor.push({type: randRoom, floor: i, index: j, connections})
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

            //Si on est avant le boss, toutes les salles y mènent
            if(i === this.mapLength - 2) {
                currentFloor.forEach((room) => {
                    room.connections = [0]
                })
            }

            else if(roomsDiff === -2) {
                currentFloor[0].connections = [0, 1]
                currentFloor[1].connections = [2, 3]
            }

            else if(roomsDiff === -1) {
                currentFloor[0].connections = [0]
                currentFloor[currentFloor.length - 1].connections = [nextFloor.length -1]

                if(currentFloor.length === 2) {
                    const randomIndex = Math.floor(Math.random() * 2)
                    currentFloor[randomIndex].connections.push(1)
                }
            }

            else if(roomsDiff === 0) {
                currentFloor.forEach((room, index) => {
                    room.connections = [index]
                })
            }

            else if(roomsDiff === 1) {
                currentFloor[0].connections = [0]
                currentFloor[currentFloor.length - 1].connections = [nextFloor.length -1]

                if(currentFloor.length === 3) {
                    const randomLink = Math.floor(Math.random() * 2)
                    currentFloor[1].connections = [randomLink]
                }

                else {
                    const randomIndex = Math.floor(Math.random() * 2) + 1
                    if(randomIndex === 1) {
                        currentFloor[1].connections = [0]
                        currentFloor[2].connections = [1]
                    }

                    else {
                        currentFloor[1].connections = [1]
                        currentFloor[2].connections = [2] 
                    }
                }
            }

            else if(roomsDiff === 2) {
                currentFloor[0].connections = [0]
                currentFloor[1].connections = [0]
                currentFloor[2].connections = [1]
                currentFloor[3].connections = [1]
            }

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
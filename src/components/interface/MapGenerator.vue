<script lang="ts">
import { Vue } from 'vue-class-component'
import { inject } from 'vue'
import cloneDeep from "lodash.clonedeep"

enum RoomType {
    BATTLE,
    ELITEBATTLE,
    UNKNOWN,
    SHOP,
    CHEST,
    BONFIRE,
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
                for(let j = 0; j < roomsAmount; j++) {
                    currentFloor.push(RoomType.BATTLE)
                }
            }

            this.currentMap.push(currentFloor)
        }
    }

    public mounted() {
        this.generateMap()
        console.log(this.currentMap)
    }
}
</script>
<style lang="scss" scoped>
@import './style/afterBattleModal.scss';
</style>
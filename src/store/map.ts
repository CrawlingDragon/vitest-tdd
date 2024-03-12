import { defineStore } from "pinia";
import { ref } from "vue"
import { Position } from "../composables/usePosition";
// 为了更好的语义化，引用enum枚举
export enum MapTile {
  FLOOR = 2,
  WALL = 1
}
type MAP = MapTile[][]


export const useMapState = defineStore('useMapState', () => {
  const map = ref<number[][]>([
    [1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 1],
    [2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1],
  ])
  function setupMap(newMap: MAP) {
    map.value.splice(0, map.value.length, ...newMap)
  }

  function isWall(position: Position) {
    // console.log('map.value', map.value);
    return map.value[position.y][position.x] === MapTile.WALL
  }

  return {
    map, setupMap, isWall
  }
})
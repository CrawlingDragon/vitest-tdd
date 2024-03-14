import { defineStore } from "pinia";
import { reactive } from "vue";
import { Position } from "../composables/usePosition";
import { useMapState } from './map';
import { useTargetStore } from "./target";

interface Cargo {
  x: number;
  y: number;
  onTarget: boolean
}

export const useCargoStore = defineStore('cargo', () => {
  const cargos = reactive<Cargo[]>([])
  function createCargo(x: number, y: number): Cargo {
    return { x, y, onTarget: false }
  }
  function addCargo({ x, y }: { x: number, y: number }) {
    cargos.push({ x, y, onTarget: false })

  }

  function moveCogo(cargo: Cargo, dx: number, dy: number) {
    const { isWall } = useMapState()
    const position = { x: cargo.x + dx, y: cargo.y + dy }

    if (isWall(position)) return false;

    if (findCargo(position)) return false;
    cargo.x += dx
    cargo.y += dy

    const { findTarget } = useTargetStore()
    const target = findTarget(cargo)

    cargo.onTarget = !!target
    // console.log('cargos', cargos);
    return true;
  }

  // 这里的！！是把taget 转换成了boolean，如果target存在，则返回true，否则返回false 
  // cargo.onTarget = true or false

  return { cargos, addCargo, createCargo, moveCogo, }
})

export function findCargo(position: Position) {
  const { cargos } = useCargoStore()
  return cargos.find((c) => {
    return c.x === position.x && c.y === position.y
  })
}
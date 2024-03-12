import { defineStore } from "pinia";
import { reactive } from "vue";
import { Position } from "../composables/usePosition";
import { useMapState } from './map';

interface Cargo {
  x: number;
  y: number;
}

export const useCargoStore = defineStore('cargo', () => {
  const cargos: Cargo[] = reactive([])
  function createCargo(x: number, y: number) {
    return { x, y }
  }
  function addCargo({ x, y }: { x: number, y: number }) {
    cargos.push({ x, y })
  }

  function moveCogo(cargo: Cargo, dx: number, dy: number) {
    const { isWall } = useMapState()
    const position = { x: cargo.x + dx, y: cargo.y + dy }

    if (isWall(position)) return false;

    const cargo2 = findCargo(position)

    if (cargo2) return false;
    cargo.x += dx
    cargo.y += dy
    return true;

  }
  return { cargos, addCargo, createCargo, moveCogo }
})

export function findCargo(position: Position) {
  const { cargos } = useCargoStore()
  return cargos.find((c) => {
    return c.x === position.x && c.y === position.y
  })
}
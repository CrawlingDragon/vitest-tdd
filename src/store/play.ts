import { defineStore } from "pinia";
import { reactive } from "vue";
// import { isWall } from "./map";
import { useMapState } from "./map";
import { findCargo, useCargoStore } from "./Cargo";

export const usePlayState = defineStore('play', () => {

  // todo 1.重构_move,和cargos find 函数
  let player = reactive({
    x: 1,
    y: 2,
  });
  const { isWall } = useMapState()
  const { moveCogo } = useCargoStore()

  // _move 用底杠表示私有函数
  function _move(dx: number, dy: number) {
    if (isWall({ x: player.x + dx, y: player.y + dy })) return

    const cargo = findCargo({ x: player.x + dx, y: player.y + dy })
    if (cargo) {
      // if (isWall({ x: cargo.x + dx, y: cargo.y + dy })) return
      // const cargo2 = findCargo({ x: cargo.x + dx, y: cargo.y + dy })
      // if (cargo2) return
      // cargo.x += dx
      // cargo.y += dy

      const isMoveCago = moveCogo(cargo, dx, dy)
      if (!isMoveCago) return
    }
    player.x += dx
    player.y += dy
  }

  function playMoveLeftHand() {
    //去匹配map的坐标，如果是1，也就是墙，则return

    _move(-1, 0)
  }
  function playMoveRightHand() {

    // if (isWall({ x: player.x + 1, y: player.y })) return
    // const cargo = findCargo({ x: player.x + 1, y: player.y })
    // if (cargo) {
    //   cargo.x += 1
    // }
    // player.x += 1;
    _move(1, 0)
  }
  function playMoveUpHand() {
    _move(0, -1)
  }
  function playMoveDownHand() {
    _move(0, 1)
  }
  return {
    player,
    playMoveLeftHand,
    playMoveRightHand,
    playMoveUpHand,
    playMoveDownHand
  }
})


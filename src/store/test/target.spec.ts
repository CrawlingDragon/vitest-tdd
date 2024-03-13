import { describe, it, expect, beforeEach } from "vitest";
import { useTargetStore } from "../target";
import { createPinia, setActivePinia } from "pinia";
import { useMapState } from "../map";
import { useCargoStore } from "../Cargo";
import { usePlayState } from '../play';

describe("test target ", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it("test target store", () => {
    const { targets, addTarget, createTarget } = useTargetStore();
    addTarget(createTarget({ x: 3, y: 2 }))
    expect(targets[0].x).toBe(3);
  });

  it('when cargo on the target', () => {
    const { setupMap } = useMapState();
    setupMap([
      [1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1]
    ])
    const { player, playMoveLeftHand } = usePlayState()
    player.x = 3
    player.y = 2

    const { cargos, addCargo, createCargo } = useCargoStore()
    addCargo(createCargo(2, 2))

    const { targets, addTarget, createTarget } = useTargetStore()
    addTarget(createTarget({ x: 1, y: 2 }))
    playMoveLeftHand()

    expect(player.x).toBe(2)
    expect(targets[0].x).toBe(1)
    expect(cargos[0].x).toBe(1)
    expect(cargos[0].onTarget).toBe(true)

  })
  it('when cargo shit out', () => {

    const { cargos, addCargo, createCargo, moveCogo } = useCargoStore()
    const cargo = createCargo(2, 2)
    addCargo(cargo)

    const { targets, addTarget, createTarget } = useTargetStore()
    addTarget(createTarget({ x: 1, y: 2 }))
    moveCogo(cargo, 1, 0)
    moveCogo(cargo, 1, 0)

    expect(targets[0].x).toBe(1)
    expect(cargos[0].onTarget).toBe(false)

  })
})
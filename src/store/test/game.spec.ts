import { describe, it, expect, beforeEach } from "vitest";
import { useTargetStore } from "../target";
import { useCargoStore } from "../Cargo";
import { createPinia, setActivePinia } from "pinia";
import { useGameStore } from "../game";

describe("Game", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('game is completed', () => {
    const { addCargo, createCargo, moveCogo } = useCargoStore();
    const cargo = createCargo(1, 2)
    addCargo(cargo)

    const { addTarget, createTarget } = useTargetStore()
    addTarget(createTarget({ x: 2, y: 2 }))

    moveCogo(cargo, 1, 0)
    // console.log('cargo1', cargo1);
    // console.log('c.cargos', c.cargos);
    const { detectionGameCompleted, game } = useGameStore()
    detectionGameCompleted()
    expect(game.isCompleted).toBe(false)
  })

})
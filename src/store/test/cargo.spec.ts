import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, it, expect } from "vitest";
import { useCargoStore } from '../Cargo';



describe("cargo", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  });
  it("cargo", () => {
    const { cargos, createCargo, addCargo } = useCargoStore();
    addCargo(createCargo(1, 2))

    expect(cargos.length).toBe(1);
  });

});
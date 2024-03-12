import { describe, it, expect, beforeEach } from "vitest";
import { useTargetStore } from "../target";
import { createPinia, setActivePinia } from "pinia";

describe("test target ", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it("test target store", () => {
    const { targets, addTarget, createTarget } = useTargetStore();
    addTarget(createTarget({ x: 3, y: 2 }))
    expect(targets[0].x).toBe(3);
  });
})
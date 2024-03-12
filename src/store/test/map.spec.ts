import { beforeEach, describe, expect, it } from "vitest";
import { useMapState } from "../map";
import { createPinia, setActivePinia } from "pinia";

describe('test map', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('test setupMap', () => {
    const { map, setupMap } = useMapState()
    const newMap = [[1, 1, 1], [2, 2, 2], [1, 2, 1]]
    setupMap(newMap)
    expect(map).toEqual(newMap)
  })
})
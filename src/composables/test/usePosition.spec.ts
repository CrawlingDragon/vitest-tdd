import { describe, it, expect } from "vitest";
import { usePosition } from "../usePosition";
import { reactive } from "vue";

describe("test usePosition", () => {
  it("should return the position", () => {
    const pos = reactive({
      x: 1,
      y: 1
    })
    const { position } = usePosition(pos);

    expect(position.value).toEqual({
      left: '32px',
      top: '32px'
    })
  });

  it('position update', () => {

    const pos = reactive({
      x: 1,
      y: 1
    })
    const { position } = usePosition(pos);

    pos.x = 2
    expect(position.value).toEqual({
      left: '64px',
      top: '32px'
    })

  })
});


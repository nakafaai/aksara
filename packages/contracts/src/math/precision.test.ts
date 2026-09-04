import { assert, describe, it } from "@effect/vitest";
import { BigDecimal } from "effect";

import {
  polygonAltitudeUnresolved,
  visiblePathResolvable,
} from "#contracts/math/precision";

const RESOLUTION = 2 ** -23;
const THRESHOLD = BigDecimal.fromNumberUnsafe(RESOLUTION);

describe("mathematical visual precision", () => {
  it("preserves every non-zero clipped line component", () => {
    assert.isFalse(
      visiblePathResolvable(
        "line",
        [
          { range: { max: 1, min: 0 }, start: 0, through: 1 },
          {
            range: { max: 1, min: 0 },
            start: 0.5,
            through: 0.5 + RESOLUTION / 2,
          },
        ],
        THRESHOLD
      )
    );
  });

  it("rejects collapsed polygon altitude but permits exact collinearity", () => {
    assert.isTrue(
      polygonAltitudeUnresolved(
        [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 0.5, y: 0.5 + RESOLUTION / 2 },
        ],
        THRESHOLD
      )
    );
    assert.isFalse(
      polygonAltitudeUnresolved(
        [
          { x: 0, y: 0 },
          { x: 0.5, y: 0.5 },
          { x: 1, y: 1 },
          { x: 0, y: 1 },
        ],
        THRESHOLD
      )
    );
  });
});

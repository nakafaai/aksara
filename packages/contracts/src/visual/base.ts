import { layoutVisuals } from "#contracts/visual/base/layout";
import { mathVisuals } from "#contracts/visual/base/math";
import { mediaVisuals } from "#contracts/visual/base/media";
import type { RichSlot } from "#contracts/visual/card";

/**
 * Base layout, math, and media visual entries shared across all content domains.
 */
export function baseVisuals<E>(rich: RichSlot<E>) {
  return {
    ...layoutVisuals(),
    ...mathVisuals(rich),
    ...mediaVisuals(rich),
  };
}

import type { RichSlot } from "#contracts/visual/card";
import { argumentVisuals } from "#contracts/visual/mathematics/argument";
import { chanceVisuals } from "#contracts/visual/mathematics/chance";
import { chartVisuals } from "#contracts/visual/mathematics/charts";
import { counterexampleVisuals } from "#contracts/visual/mathematics/counterexample";
import { functionVisuals } from "#contracts/visual/mathematics/function";
import { geometryVisuals } from "#contracts/visual/mathematics/geometry";
import { journeyVisuals } from "#contracts/visual/mathematics/journey";
import { logicVisuals } from "#contracts/visual/mathematics/logic";
import { networkVisuals } from "#contracts/visual/mathematics/network";
import { numeralVisuals } from "#contracts/visual/mathematics/numeral";
import { setVisuals } from "#contracts/visual/mathematics/sets";

/**
 * Every mathematics visual entry in the catalog across charts, functions,
 * geometry, probability, logic, and discrete labs.
 */
export function mathematicsVisuals<E>(rich: RichSlot<E>) {
  return {
    ...argumentVisuals(rich),
    ...chanceVisuals(rich),
    ...chartVisuals(rich),
    ...counterexampleVisuals(rich),
    ...functionVisuals(rich),
    ...geometryVisuals(rich),
    ...journeyVisuals(rich),
    ...logicVisuals(rich),
    ...networkVisuals(rich),
    ...numeralVisuals(rich),
    ...setVisuals(rich),
  };
}

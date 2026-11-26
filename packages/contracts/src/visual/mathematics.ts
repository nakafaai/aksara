import type { RichSlot } from "#contracts/visual/card";
import { argumentVisuals } from "#contracts/visual/mathematics/argument";
import { chanceVisuals } from "#contracts/visual/mathematics/chance";
import { chartVisuals } from "#contracts/visual/mathematics/charts";
import { counterexampleVisuals } from "#contracts/visual/mathematics/counterexample";
import { derivativeVisuals } from "#contracts/visual/mathematics/derivative";
import { functionVisuals } from "#contracts/visual/mathematics/function";
import { geometryVisuals } from "#contracts/visual/mathematics/geometry";
import { integralVisuals } from "#contracts/visual/mathematics/integral";
import { journeyVisuals } from "#contracts/visual/mathematics/journey";
import { limitVisuals } from "#contracts/visual/mathematics/limit";
import { linearVisuals } from "#contracts/visual/mathematics/linear";
import { logicVisuals } from "#contracts/visual/mathematics/logic";
import { networkVisuals } from "#contracts/visual/mathematics/network";
import { numeralVisuals } from "#contracts/visual/mathematics/numeral";
import { setVisuals } from "#contracts/visual/mathematics/sets";
import { vectorVisuals } from "#contracts/visual/mathematics/vector";

/**
 * Every mathematics visual entry in the catalog across charts, functions,
 * geometry, calculus, linear methods, vectors, probability, logic, and
 * discrete labs.
 */
export function mathematicsVisuals<E>(rich: RichSlot<E>) {
  return {
    ...argumentVisuals(rich),
    ...chanceVisuals(rich),
    ...chartVisuals(rich),
    ...counterexampleVisuals(rich),
    ...derivativeVisuals(rich),
    ...functionVisuals(rich),
    ...geometryVisuals(rich),
    ...integralVisuals(rich),
    ...journeyVisuals(rich),
    ...limitVisuals(rich),
    ...linearVisuals(rich),
    ...logicVisuals(rich),
    ...networkVisuals(rich),
    ...numeralVisuals(rich),
    ...setVisuals(rich),
    ...vectorVisuals(rich),
  };
}

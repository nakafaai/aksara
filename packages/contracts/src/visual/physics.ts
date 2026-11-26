import type { RichSlot } from "#contracts/visual/card";
import { brakingVisuals } from "#contracts/visual/physics/braking";
import { circuitVisuals } from "#contracts/visual/physics/circuit";
import { circularVisuals } from "#contracts/visual/physics/circular";
import { dynamicsVisuals } from "#contracts/visual/physics/dynamics";
import { efficiencyVisuals } from "#contracts/visual/physics/efficiency";
import { electronicsVisuals } from "#contracts/visual/physics/electronics";
import { fallingVisuals } from "#contracts/visual/physics/falling";
import { fieldVisuals } from "#contracts/visual/physics/field";
import { fluidVisuals } from "#contracts/visual/physics/fluid";
import { forceVisuals } from "#contracts/visual/physics/force";
import { gravityVisuals } from "#contracts/visual/physics/gravity";
import { heatVisuals } from "#contracts/visual/physics/heat";
import { instrumentVisuals } from "#contracts/visual/physics/instrument";
import { lightVisuals } from "#contracts/visual/physics/light";
import { measurementVisuals } from "#contracts/visual/physics/measurement";
import { motionVisuals } from "#contracts/visual/physics/motion";
import { nuclearVisuals } from "#contracts/visual/physics/nuclear";
import { parabolicVisuals } from "#contracts/visual/physics/parabolic";
import { positionVisuals } from "#contracts/visual/physics/position";
import { powerVisuals } from "#contracts/visual/physics/power";
import { precisionVisuals } from "#contracts/visual/physics/precision";
import { productVisuals } from "#contracts/visual/physics/product";
import { quantumVisuals } from "#contracts/visual/physics/quantum";
import { readingVisuals } from "#contracts/visual/physics/reading";
import { recordVisuals } from "#contracts/visual/physics/record";
import { relativeVisuals } from "#contracts/visual/physics/relative";
import { solarVisuals } from "#contracts/visual/physics/solar";
import { thermodynamicsVisuals } from "#contracts/visual/physics/thermodynamics";
import { vectorVisuals } from "#contracts/visual/physics/vector";
import { velocityVisuals } from "#contracts/visual/physics/velocity";
import { waveVisuals } from "#contracts/visual/physics/wave";

/**
 * Every physics visual entry in the catalog across mechanics, waves, optics,
 * electricity, electronics, thermodynamics, nuclear, and quantum labs.
 */
export function physicsVisuals<E>(rich: RichSlot<E>) {
  return {
    ...brakingVisuals(rich),
    ...circuitVisuals(rich),
    ...circularVisuals(rich),
    ...dynamicsVisuals(rich),
    ...efficiencyVisuals(rich),
    ...electronicsVisuals(rich),
    ...fallingVisuals(rich),
    ...fieldVisuals(rich),
    ...fluidVisuals(rich),
    ...forceVisuals(rich),
    ...gravityVisuals(rich),
    ...heatVisuals(rich),
    ...instrumentVisuals(rich),
    ...lightVisuals(rich),
    ...measurementVisuals(rich),
    ...motionVisuals(rich),
    ...nuclearVisuals(rich),
    ...parabolicVisuals(rich),
    ...positionVisuals(rich),
    ...powerVisuals(rich),
    ...precisionVisuals(rich),
    ...productVisuals(rich),
    ...quantumVisuals(rich),
    ...readingVisuals(rich),
    ...recordVisuals(rich),
    ...relativeVisuals(rich),
    ...solarVisuals(rich),
    ...thermodynamicsVisuals(rich),
    ...vectorVisuals(rich),
    ...velocityVisuals(rich),
    ...waveVisuals(rich),
  };
}

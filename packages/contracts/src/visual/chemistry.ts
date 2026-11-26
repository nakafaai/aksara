import type { RichSlot } from "#contracts/visual/card";
import { atomVisuals } from "#contracts/visual/chemistry/atom";
import { balanceVisuals } from "#contracts/visual/chemistry/balance";
import { bondingVisuals } from "#contracts/visual/chemistry/bonding";
import { discoveryVisuals } from "#contracts/visual/chemistry/discovery";
import { electrochemistryVisuals } from "#contracts/visual/chemistry/electrochemistry";
import { electronVisuals } from "#contracts/visual/chemistry/electron";
import { equilibriumVisuals } from "#contracts/visual/chemistry/equilibrium";
import { greenVisuals } from "#contracts/visual/chemistry/green";
import { groupVisuals } from "#contracts/visual/chemistry/groups";
import { industryVisuals } from "#contracts/visual/chemistry/industry";
import { lawVisuals } from "#contracts/visual/chemistry/laws";
import { materialVisuals } from "#contracts/visual/chemistry/materials";
import { organicVisuals } from "#contracts/visual/chemistry/organic";
import { particleVisuals } from "#contracts/visual/chemistry/particles";
import { periodicVisuals } from "#contracts/visual/chemistry/periodic";
import { polymerVisuals } from "#contracts/visual/chemistry/polymer";
import { rateVisuals } from "#contracts/visual/chemistry/rate";
import { reactionVisuals } from "#contracts/visual/chemistry/reaction";
import { solutionVisuals } from "#contracts/visual/chemistry/solution";
import { stoichiometryVisuals } from "#contracts/visual/chemistry/stoichiometry";
import { titrationVisuals } from "#contracts/visual/chemistry/titration";

/**
 * Every chemistry visual entry in the catalog across atomic, bonding, kinetics,
 * equilibrium, solution, organic, green, industrial, materials, and polymer labs.
 */
export function chemistryVisuals<E>(rich: RichSlot<E>) {
  return {
    ...atomVisuals(rich),
    ...balanceVisuals(rich),
    ...bondingVisuals(rich),
    ...discoveryVisuals(rich),
    ...electrochemistryVisuals(rich),
    ...electronVisuals(rich),
    ...equilibriumVisuals(rich),
    ...greenVisuals(rich),
    ...groupVisuals(rich),
    ...industryVisuals(rich),
    ...lawVisuals(rich),
    ...materialVisuals(rich),
    ...organicVisuals(rich),
    ...particleVisuals(rich),
    ...periodicVisuals(rich),
    ...polymerVisuals(rich),
    ...rateVisuals(rich),
    ...reactionVisuals(rich),
    ...solutionVisuals(rich),
    ...stoichiometryVisuals(rich),
    ...titrationVisuals(rich),
  };
}

import { singaporeBodyUnit } from "#corpus/curriculum/singapore-moe/units/biology/body";
import {
  singaporeCellsUnit,
  singaporeEcosystemsUnit,
} from "#corpus/curriculum/singapore-moe/units/biology/cell";

/** The units of Singapore SEC G3 Biology (K325), one per official strand or section a lesson teaches, in syllabus order. */
export const singaporeBiologyUnitNodes = [
  singaporeCellsUnit,
  singaporeBodyUnit,
  singaporeEcosystemsUnit,
];

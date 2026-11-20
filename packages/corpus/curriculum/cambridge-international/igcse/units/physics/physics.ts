import {
  igcseElectricityUnit,
  igcseNuclearUnit,
} from "#corpus/curriculum/cambridge-international/igcse/units/physics/fields";
import {
  igcseThermalUnit,
  igcseWavesUnit,
} from "#corpus/curriculum/cambridge-international/igcse/units/physics/matter";
import { igcseMotionUnit } from "#corpus/curriculum/cambridge-international/igcse/units/physics/mechanics";

/** The units of Cambridge IGCSE Physics 0625, one per official topic a lesson teaches, in syllabus order. */
export const igcsePhysicsUnitNodes = [
  igcseMotionUnit,
  igcseThermalUnit,
  igcseWavesUnit,
  igcseElectricityUnit,
  igcseNuclearUnit,
];

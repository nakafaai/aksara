import {
  singaporeElectricityUnit,
  singaporeRadioactivityUnit,
} from "#corpus/curriculum/singapore-moe/units/physics/fields";
import {
  singaporeThermalUnit,
  singaporeWavesUnit,
} from "#corpus/curriculum/singapore-moe/units/physics/matter";
import {
  singaporeMeasurementUnit,
  singaporeMechanicsUnit,
} from "#corpus/curriculum/singapore-moe/units/physics/mechanics";

/** The units of Singapore SEC G3 Physics (K323), one per official strand or section a lesson teaches, in syllabus order. */
export const singaporePhysicsUnitNodes = [
  singaporeMeasurementUnit,
  singaporeMechanicsUnit,
  singaporeThermalUnit,
  singaporeWavesUnit,
  singaporeElectricityUnit,
  singaporeRadioactivityUnit,
];

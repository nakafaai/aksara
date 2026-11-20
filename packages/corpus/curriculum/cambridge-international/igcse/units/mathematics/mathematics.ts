import { igcseAlgebraGraphsUnit } from "#corpus/curriculum/cambridge-international/igcse/units/mathematics/algebra";
import {
  igcseCoordinateGeometryUnit,
  igcseGeometryUnit,
  igcseMensurationUnit,
} from "#corpus/curriculum/cambridge-international/igcse/units/mathematics/geometry";
import { igcseNumberUnit } from "#corpus/curriculum/cambridge-international/igcse/units/mathematics/number";
import {
  igcseProbabilityUnit,
  igcseStatisticsUnit,
} from "#corpus/curriculum/cambridge-international/igcse/units/mathematics/statistics";
import {
  igcseTransformationsVectorsUnit,
  igcseTrigonometryUnit,
} from "#corpus/curriculum/cambridge-international/igcse/units/mathematics/trigonometry";

/** The units of Cambridge IGCSE Mathematics 0580, one per official topic, in syllabus order. */
export const igcseMathematicsUnitNodes = [
  igcseNumberUnit,
  igcseAlgebraGraphsUnit,
  igcseCoordinateGeometryUnit,
  igcseGeometryUnit,
  igcseMensurationUnit,
  igcseTrigonometryUnit,
  igcseTransformationsVectorsUnit,
  igcseProbabilityUnit,
  igcseStatisticsUnit,
];

import {
  hannoverMedicalFunctionsUnit,
  hannoverMedicalLimitsUnit,
} from "#corpus/curriculum/studienkolleg/hannover/medical/analysis";
import {
  hannoverMedicalDerivativesUnit,
  hannoverMedicalIntegralsUnit,
} from "#corpus/curriculum/studienkolleg/hannover/medical/calculus";
import {
  hannoverMedicalCorrelationUnit,
  hannoverMedicalDistributionsUnit,
} from "#corpus/curriculum/studienkolleg/hannover/medical/statistics";

/** The units of Mathematik in the M-Kurs of the Niedersächsisches Studienkolleg: the items of its Analysis and Statistik lists that a lesson teaches, in list order. */
export const hannoverMedicalMathematicsUnitNodes = [
  hannoverMedicalFunctionsUnit,
  hannoverMedicalLimitsUnit,
  hannoverMedicalDerivativesUnit,
  hannoverMedicalIntegralsUnit,
  hannoverMedicalDistributionsUnit,
  hannoverMedicalCorrelationUnit,
];

import {
  hannoverTechnicalFunctionsUnit,
  hannoverTechnicalSequencesUnit,
} from "#corpus/curriculum/studienkolleg/hannover/technical/analysis";
import {
  hannoverTechnicalDerivativesUnit,
  hannoverTechnicalIntegralsUnit,
  hannoverTechnicalLimitsUnit,
} from "#corpus/curriculum/studienkolleg/hannover/technical/calculus";
import {
  hannoverTechnicalLinearSystemsUnit,
  hannoverTechnicalMatricesUnit,
  hannoverTechnicalVectorAlgebraUnit,
} from "#corpus/curriculum/studienkolleg/hannover/technical/vectors";

/** The units of Mathematik in the T-Kurs of the Niedersächsisches Studienkolleg: the items of its Analysis and Vektorrechnung lists that a lesson teaches, in list order. */
export const hannoverTechnicalMathematicsUnitNodes = [
  hannoverTechnicalFunctionsUnit,
  hannoverTechnicalSequencesUnit,
  hannoverTechnicalLimitsUnit,
  hannoverTechnicalDerivativesUnit,
  hannoverTechnicalIntegralsUnit,
  hannoverTechnicalVectorAlgebraUnit,
  hannoverTechnicalLinearSystemsUnit,
  hannoverTechnicalMatricesUnit,
];

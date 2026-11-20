import {
  sachsenTechnicalConicSectionsUnit,
  sachsenTechnicalLinearSystemsUnit,
  sachsenTechnicalVectorsUnit,
} from "#corpus/curriculum/studienkolleg/sachsen/technical/algebra";
import {
  sachsenTechnicalComplexNumbersUnit,
  sachsenTechnicalFunctionsUnit,
} from "#corpus/curriculum/studienkolleg/sachsen/technical/analysis";
import {
  sachsenTechnicalDerivativesUnit,
  sachsenTechnicalIntegralsUnit,
} from "#corpus/curriculum/studienkolleg/sachsen/technical/calculus";

/** The units of Mathematik in the T-Kurs of the Studienkolleg Sachsen: the Stoffgebiete of its Feststellungsprüfung sheet that a lesson teaches, in sheet order. */
export const sachsenTechnicalMathematicsUnitNodes = [
  sachsenTechnicalComplexNumbersUnit,
  sachsenTechnicalFunctionsUnit,
  sachsenTechnicalDerivativesUnit,
  sachsenTechnicalIntegralsUnit,
  sachsenTechnicalLinearSystemsUnit,
  sachsenTechnicalVectorsUnit,
  sachsenTechnicalConicSectionsUnit,
];

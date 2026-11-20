import {
  igcseCirculationUnit,
  igcseCoordinationUnit,
  igcseDiseaseUnit,
  igcseGasExchangeUnit,
  igcseNutritionUnit,
} from "#corpus/curriculum/cambridge-international/igcse/units/biology/human";
import {
  igcseCellTransportUnit,
  igcseClassificationUnit,
  igcseHumanInfluenceUnit,
  igcseOrganisationUnit,
} from "#corpus/curriculum/cambridge-international/igcse/units/biology/organism";

/** The units of Cambridge IGCSE Biology 0610, one per official topic a lesson teaches, in syllabus order. */
export const igcseBiologyUnitNodes = [
  igcseClassificationUnit,
  igcseOrganisationUnit,
  igcseCellTransportUnit,
  igcseNutritionUnit,
  igcseCirculationUnit,
  igcseDiseaseUnit,
  igcseGasExchangeUnit,
  igcseCoordinationUnit,
  igcseHumanInfluenceUnit,
];

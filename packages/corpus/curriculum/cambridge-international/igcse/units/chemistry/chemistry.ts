import {
  igcseMetalsUnit,
  igcseOrganicUnit,
  igcsePeriodicTableUnit,
  igcseTechniquesUnit,
} from "#corpus/curriculum/cambridge-international/igcse/units/chemistry/elements";
import {
  igcseAtomsUnit,
  igcseStoichiometryUnit,
} from "#corpus/curriculum/cambridge-international/igcse/units/chemistry/matter";
import {
  igcseAcidsUnit,
  igcseElectrochemistryUnit,
  igcseEnergeticsUnit,
  igcseReactionsUnit,
} from "#corpus/curriculum/cambridge-international/igcse/units/chemistry/reaction";

/** The units of Cambridge IGCSE Chemistry 0620, one per official topic a lesson teaches, in syllabus order. */
export const igcseChemistryUnitNodes = [
  igcseAtomsUnit,
  igcseStoichiometryUnit,
  igcseElectrochemistryUnit,
  igcseEnergeticsUnit,
  igcseReactionsUnit,
  igcseAcidsUnit,
  igcsePeriodicTableUnit,
  igcseMetalsUnit,
  igcseOrganicUnit,
  igcseTechniquesUnit,
];

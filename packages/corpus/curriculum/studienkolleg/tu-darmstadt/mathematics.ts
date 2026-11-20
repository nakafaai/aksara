import {
  tuDarmstadtCalculusUnit,
  tuDarmstadtFunctionsUnit,
} from "#corpus/curriculum/studienkolleg/tu-darmstadt/analysis";
import { tuDarmstadtVectorsUnit } from "#corpus/curriculum/studienkolleg/tu-darmstadt/vectors";

/** The units of Mathematik in the T-Kurs of the Studienkolleg der TU Darmstadt, one per Schwerpunkt of its official subject page, in page order. */
export const tuDarmstadtTechnicalMathematicsUnitNodes = [
  tuDarmstadtFunctionsUnit,
  tuDarmstadtCalculusUnit,
  tuDarmstadtVectorsUnit,
];

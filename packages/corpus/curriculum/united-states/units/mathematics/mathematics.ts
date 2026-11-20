import { usAlgebraUnit } from "#corpus/curriculum/united-states/units/mathematics/algebra";
import { usFunctionsUnit } from "#corpus/curriculum/united-states/units/mathematics/functions";
import { usGeometryUnit } from "#corpus/curriculum/united-states/units/mathematics/geometry";
import { usNumberQuantityUnit } from "#corpus/curriculum/united-states/units/mathematics/number";
import { usStatisticsProbabilityUnit } from "#corpus/curriculum/united-states/units/mathematics/statistics";

/** The units of United States high school Common Core State Standards for Mathematics, by conceptual category, in official order. */
export const usMathematicsUnitNodes = [
  usNumberQuantityUnit,
  usAlgebraUnit,
  usFunctionsUnit,
  usGeometryUnit,
  usStatisticsProbabilityUnit,
];

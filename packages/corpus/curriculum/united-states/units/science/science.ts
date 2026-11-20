import {
  usEarthSpaceSciencesUnit,
  usLifeSciencesUnit,
} from "#corpus/curriculum/united-states/units/science/life";
import { usPhysicalSciencesUnit } from "#corpus/curriculum/united-states/units/science/physical";

/** The units of United States high school Next Generation Science Standards, by discipline, in official order. */
export const usScienceUnitNodes = [
  usPhysicalSciencesUnit,
  usLifeSciencesUnit,
  usEarthSpaceSciencesUnit,
];

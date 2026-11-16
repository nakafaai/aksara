import { kssmForm4ChemistryFoundationNodes } from "#corpus/curriculum/kssm/form4/chemistry/foundation";
import { kssmForm4ChemistryIndustryNodes } from "#corpus/curriculum/kssm/form4/chemistry/industry";
import { kssmForm4ChemistryInteractionNodes } from "#corpus/curriculum/kssm/form4/chemistry/interaction";

/** The KSSM Form 4 Chemistry chapters, in the order of their DSKP. */
export const kssmForm4ChemistryTopicNodes = [
  ...kssmForm4ChemistryFoundationNodes,
  ...kssmForm4ChemistryInteractionNodes,
  ...kssmForm4ChemistryIndustryNodes,
];

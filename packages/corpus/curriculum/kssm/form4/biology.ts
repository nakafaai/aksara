import { kssmForm4BiologyProcessNodes } from "#corpus/curriculum/kssm/form4/biology/process";
import { kssmForm4BiologyStructureNodes } from "#corpus/curriculum/kssm/form4/biology/structure";

/** The KSSM Form 4 Biology chapters on cells, Bab 1 to Bab 7 of the DSKP, in their order. */
export const kssmForm4BiologyTopicNodes = [
  ...kssmForm4BiologyStructureNodes,
  ...kssmForm4BiologyProcessNodes,
];

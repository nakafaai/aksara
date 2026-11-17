import { kssmForm5BiologyEcologyNodes } from "#corpus/curriculum/kssm/form5/biology/ecology";
import { kssmForm5BiologyGeneticsNodes } from "#corpus/curriculum/kssm/form5/biology/genetics";
import { kssmForm5BiologyLifeNodes } from "#corpus/curriculum/kssm/form5/biology/life";
import { kssmForm5BiologyStructureNodes } from "#corpus/curriculum/kssm/form5/biology/structure";

/** The KSSM Form 5 Biology chapters, in the order of their DSKP. */
export const kssmForm5BiologyTopicNodes = [
  ...kssmForm5BiologyStructureNodes,
  ...kssmForm5BiologyLifeNodes,
  ...kssmForm5BiologyEcologyNodes,
  ...kssmForm5BiologyGeneticsNodes,
];

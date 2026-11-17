import { kssmForm5AdditionalMathematicsCalculusNodes } from "#corpus/curriculum/kssm/form5/mathematics/additional/calculus";
import { kssmForm5AdditionalMathematicsGeometryNodes } from "#corpus/curriculum/kssm/form5/mathematics/additional/geometry";
import { kssmForm5AdditionalMathematicsKinematicsNodes } from "#corpus/curriculum/kssm/form5/mathematics/additional/kinematics";
import { kssmForm5AdditionalMathematicsProgrammingNodes } from "#corpus/curriculum/kssm/form5/mathematics/additional/programming";
import { kssmForm5AdditionalMathematicsStatisticsNodes } from "#corpus/curriculum/kssm/form5/mathematics/additional/statistics";
import { kssmForm5AdditionalMathematicsTrigonometryNodes } from "#corpus/curriculum/kssm/form5/mathematics/additional/trigonometry";

/** The KSSM Form 5 Additional Mathematics chapters, in the order of their DSKP. */
export const kssmForm5AdditionalMathematicsTopicNodes = [
  ...kssmForm5AdditionalMathematicsGeometryNodes,
  ...kssmForm5AdditionalMathematicsCalculusNodes,
  ...kssmForm5AdditionalMathematicsStatisticsNodes,
  ...kssmForm5AdditionalMathematicsTrigonometryNodes,
  ...kssmForm5AdditionalMathematicsProgrammingNodes,
  ...kssmForm5AdditionalMathematicsKinematicsNodes,
];

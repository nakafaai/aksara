import { kssmForm4AdditionalMathematicsAlgebraNodes } from "#corpus/curriculum/kssm/form4/mathematics/additional/algebra";
import { kssmForm4AdditionalMathematicsGeometryNodes } from "#corpus/curriculum/kssm/form4/mathematics/additional/geometry";
import { kssmForm4AdditionalMathematicsStatisticsNodes } from "#corpus/curriculum/kssm/form4/mathematics/additional/statistics";

/** The KSSM Form 4 Additional Mathematics chapters, in the order of their DSKP. */
export const kssmForm4AdditionalMathematicsTopicNodes = [
  ...kssmForm4AdditionalMathematicsAlgebraNodes,
  ...kssmForm4AdditionalMathematicsGeometryNodes,
  ...kssmForm4AdditionalMathematicsStatisticsNodes,
];

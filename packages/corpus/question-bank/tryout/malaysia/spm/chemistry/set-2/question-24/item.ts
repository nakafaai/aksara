import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Cell I: chlorine. Cell II: oxygen, $$0.24\\text{ dm}^3$$" },
        { correct: false, label: "Cell I: oxygen. Cell II: chlorine, $$0.96\\text{ dm}^3$$" },
        { correct: false, label: "Cell I: chlorine. Cell II: chlorine, $$0.48\\text{ dm}^3$$" },
        { correct: true, label: "Cell I: oxygen. Cell II: chlorine, $$0.48\\text{ dm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Sel I: klorin. Sel II: oksigen, $$0.24\\text{ dm}^3$$" },
        { correct: false, label: "Sel I: oksigen. Sel II: klorin, $$0.96\\text{ dm}^3$$" },
        { correct: false, label: "Sel I: klorin. Sel II: klorin, $$0.48\\text{ dm}^3$$" },
        { correct: true, label: "Sel I: oksigen. Sel II: klorin, $$0.48\\text{ dm}^3$$" },
      ],
    },
  },
};

export default item;

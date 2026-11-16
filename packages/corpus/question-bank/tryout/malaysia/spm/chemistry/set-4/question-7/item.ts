import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.602 \\\\times 10^{23}$$ ions in total" },
        { correct: false, label: "$$1.20 \\\\times 10^{23}$$ ions in total" },
        { correct: true, label: "$$1.81 \\\\times 10^{23}$$ ions in total, of which $$1.20 \\\\times 10^{23}$$ are chloride ions" },
        { correct: false, label: "$$1.81 \\\\times 10^{23}$$ ions in total, of which $$0.602 \\\\times 10^{23}$$ are chloride ions" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.602 \\\\times 10^{23}$$ ion semuanya" },
        { correct: false, label: "$$1.20 \\\\times 10^{23}$$ ion semuanya" },
        { correct: true, label: "$$1.81 \\\\times 10^{23}$$ ion semuanya, dengan $$1.20 \\\\times 10^{23}$$ daripadanya ion klorida" },
        { correct: false, label: "$$1.81 \\\\times 10^{23}$$ ion semuanya, dengan $$0.602 \\\\times 10^{23}$$ daripadanya ion klorida" },
      ],
    },
  },
};

export default item;

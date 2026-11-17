import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$42.9\\%$$, $$7.22\\times10^{22}$$ electrons, $$1.26\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$57.1\\%$$, $$7.22\\times10^{22}$$ electrons, $$1.26\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$42.9\\%$$, $$3.61\\times10^{22}$$ electrons, $$1.26\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$42.9\\%$$, $$7.22\\times10^{22}$$ electrons, $$2.52\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$42.9\\%$$, $$7.22\\times10^{22}$$ elektron, $$1.26\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$57.1\\%$$, $$7.22\\times10^{22}$$ elektron, $$1.26\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$42.9\\%$$, $$3.61\\times10^{22}$$ elektron, $$1.26\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$42.9\\%$$, $$7.22\\times10^{22}$$ elektron, $$2.52\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;

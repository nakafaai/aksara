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
            "$$1.81\\times10^{23}$$ electrons, $$3.60\\text{ dm}^3$$, $$3.60\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$6.02\\times10^{22}$$ electrons, $$1.20\\text{ dm}^3$$, $$1.20\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$1.81\\times10^{23}$$ electrons, $$3.60\\text{ dm}^3$$, $$7.20\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$1.81\\times10^{23}$$ electrons, $$7.20\\text{ dm}^3$$, $$7.20\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$1.81\\times10^{23}$$ elektron, $$3.60\\text{ dm}^3$$, $$3.60\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$6.02\\times10^{22}$$ elektron, $$1.20\\text{ dm}^3$$, $$1.20\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$1.81\\times10^{23}$$ elektron, $$3.60\\text{ dm}^3$$, $$7.20\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$1.81\\times10^{23}$$ elektron, $$7.20\\text{ dm}^3$$, $$7.20\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;

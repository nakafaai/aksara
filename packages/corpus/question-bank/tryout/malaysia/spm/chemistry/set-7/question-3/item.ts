import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.01\\times10^{22}$$ molecules, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$3.76\\times10^{21}$$ molecules, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$3.76\\times10^{21}$$ molecules, $$0.150\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$1.51\\times10^{22}$$ molecules, $$1.20\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.01\\times10^{22}$$ molekul, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$3.76\\times10^{21}$$ molekul, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$3.76\\times10^{21}$$ molekul, $$0.150\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$1.51\\times10^{22}$$ molekul, $$1.20\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;

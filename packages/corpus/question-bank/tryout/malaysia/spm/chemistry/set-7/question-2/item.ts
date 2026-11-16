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
          correct: true,
          label: "$$216\\text{ cm}^3$$, $$1.20\\times10^{22}$$ atoms",
        },
        {
          correct: false,
          label: "$$240\\text{ cm}^3$$, $$1.20\\times10^{22}$$ atoms",
        },
        {
          correct: false,
          label: "$$216\\text{ cm}^3$$, $$5.42\\times10^{21}$$ atoms",
        },
        {
          correct: false,
          label: "$$264\\text{ cm}^3$$, $$1.20\\times10^{22}$$ atoms",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$216\\text{ cm}^3$$, $$1.20\\times10^{22}$$ atom",
        },
        {
          correct: false,
          label: "$$240\\text{ cm}^3$$, $$1.20\\times10^{22}$$ atom",
        },
        {
          correct: false,
          label: "$$216\\text{ cm}^3$$, $$5.42\\times10^{21}$$ atom",
        },
        {
          correct: false,
          label: "$$264\\text{ cm}^3$$, $$1.20\\times10^{22}$$ atom",
        },
      ],
    },
  },
};

export default item;

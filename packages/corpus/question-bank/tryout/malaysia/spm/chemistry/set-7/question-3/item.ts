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
          label: "$$3.01\\times10^{22}$$ molecules, $$200\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$3.76\\times10^{21}$$ molecules, $$200\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$3.76\\times10^{21}$$ molecules, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$3.76\\times10^{21}$$ molecules, $$25.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.01\\times10^{22}$$ molekul, $$200\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$3.76\\times10^{21}$$ molekul, $$200\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$3.76\\times10^{21}$$ molekul, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$3.76\\times10^{21}$$ molekul, $$25.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;

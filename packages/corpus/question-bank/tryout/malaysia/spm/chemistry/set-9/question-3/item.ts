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
          label:
            "$$692\\text{ cm}^3$$, $$1.74\\times10^{22}$$ molecules, $$7.23\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1384\\text{ cm}^3$$, $$3.47\\times10^{22}$$ molecules, $$3.61\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$692\\text{ cm}^3$$, $$2.51\\times10^{19}$$ molecules, $$7.23\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$857\\text{ cm}^3$$, $$2.15\\times10^{22}$$ molecules, $$5.83\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$692\\text{ cm}^3$$, $$1.74\\times10^{22}$$ molekul, $$7.23\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1384\\text{ cm}^3$$, $$3.47\\times10^{22}$$ molekul, $$3.61\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$692\\text{ cm}^3$$, $$2.51\\times10^{19}$$ molekul, $$7.23\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$857\\text{ cm}^3$$, $$2.15\\times10^{22}$$ molekul, $$5.83\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;

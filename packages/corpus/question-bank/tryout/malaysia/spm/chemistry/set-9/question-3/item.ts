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
            "$$692\\text{ cm}^3$$, $$7.23\\text{ cm}^3$$, $$2.51\\times10^{23}$$ atoms",
        },
        {
          correct: false,
          label:
            "$$1384\\text{ cm}^3$$, $$3.61\\text{ cm}^3$$, $$2.51\\times10^{23}$$ atoms",
        },
        {
          correct: false,
          label:
            "$$692\\text{ cm}^3$$, $$7.23\\text{ cm}^3$$, $$1.25\\times10^{23}$$ atoms",
        },
        {
          correct: false,
          label:
            "$$857\\text{ cm}^3$$, $$5.83\\text{ cm}^3$$, $$2.51\\times10^{23}$$ atoms",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$692\\text{ cm}^3$$, $$7.23\\text{ cm}^3$$, $$2.51\\times10^{23}$$ atom",
        },
        {
          correct: false,
          label:
            "$$1384\\text{ cm}^3$$, $$3.61\\text{ cm}^3$$, $$2.51\\times10^{23}$$ atom",
        },
        {
          correct: false,
          label:
            "$$692\\text{ cm}^3$$, $$7.23\\text{ cm}^3$$, $$1.25\\times10^{23}$$ atom",
        },
        {
          correct: false,
          label:
            "$$857\\text{ cm}^3$$, $$5.83\\text{ cm}^3$$, $$2.51\\times10^{23}$$ atom",
        },
      ],
    },
  },
};

export default item;

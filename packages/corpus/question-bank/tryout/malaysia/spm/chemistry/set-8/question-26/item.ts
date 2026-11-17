import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.15\\text{ g}$$, $$1200\\text{ cm}^3$$, $$600\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.15\\text{ g}$$, $$600\\text{ cm}^3$$, $$600\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$2.30\\text{ g}$$, $$600\\text{ cm}^3$$, $$1200\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.15\\text{ g}$$, $$600\\text{ cm}^3$$, $$1200\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.15\\text{ g}$$, $$1200\\text{ cm}^3$$, $$600\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.15\\text{ g}$$, $$600\\text{ cm}^3$$, $$600\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$2.30\\text{ g}$$, $$600\\text{ cm}^3$$, $$1200\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.15\\text{ g}$$, $$600\\text{ cm}^3$$, $$1200\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;

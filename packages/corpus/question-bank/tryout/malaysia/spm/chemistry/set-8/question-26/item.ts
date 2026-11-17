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
            "$$1200\\text{ cm}^3$$, $$600\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$600\\text{ cm}^3$$, $$600\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$600\\text{ cm}^3$$, $$600\\text{ cm}^3$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$600\\text{ cm}^3$$, $$1200\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1200\\text{ cm}^3$$, $$600\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$600\\text{ cm}^3$$, $$600\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$600\\text{ cm}^3$$, $$600\\text{ cm}^3$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$600\\text{ cm}^3$$, $$1200\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;

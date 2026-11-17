import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1200\\text{ cm}^3$$, $$1.48\\text{ g}$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$600\\text{ cm}^3$$, $$1.48\\text{ g}$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$600\\text{ cm}^3$$, $$1.85\\text{ g}$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$600\\text{ cm}^3$$, $$1.48\\text{ g}$$, $$500\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1200\\text{ cm}^3$$, $$1.48\\text{ g}$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$600\\text{ cm}^3$$, $$1.48\\text{ g}$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$600\\text{ cm}^3$$, $$1.85\\text{ g}$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$600\\text{ cm}^3$$, $$1.48\\text{ g}$$, $$500\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;

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
          correct: false,
          label: "$$1.56\\text{ g}$$, $$0\\text{ g}$$, $$40.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.17\\text{ g}$$, $$0.200\\text{ g}$$, $$15.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.17\\text{ g}$$, $$0.400\\text{ g}$$, $$30.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.17\\text{ g}$$, $$0.200\\text{ g}$$, $$30.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.56\\text{ g}$$, $$0\\text{ g}$$, $$40.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.17\\text{ g}$$, $$0.200\\text{ g}$$, $$15.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.17\\text{ g}$$, $$0.400\\text{ g}$$, $$30.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.17\\text{ g}$$, $$0.200\\text{ g}$$, $$30.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;

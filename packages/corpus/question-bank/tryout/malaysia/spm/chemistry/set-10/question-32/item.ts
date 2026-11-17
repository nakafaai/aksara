import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$240\\text{ cm}^3$$, $$1.70\\text{ g}$$, $$240\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$1.70\\text{ g}$$, $$120\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$240\\text{ cm}^3$$, $$0.850\\text{ g}$$, $$120\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$120\\text{ cm}^3$$, $$0.850\\text{ g}$$, $$120\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$240\\text{ cm}^3$$, $$1.70\\text{ g}$$, $$240\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$1.70\\text{ g}$$, $$120\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$240\\text{ cm}^3$$, $$0.850\\text{ g}$$, $$120\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$120\\text{ cm}^3$$, $$0.850\\text{ g}$$, $$120\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;

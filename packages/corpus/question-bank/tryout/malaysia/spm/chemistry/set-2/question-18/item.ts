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
          label:
            "$$0.600\\text{ g}$$, $$240\\text{ cm}^3$$, $$30.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.500\\text{ g}$$, $$120\\text{ cm}^3$$, $$40.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$0.500\\text{ g}$$, $$240\\text{ cm}^3$$, $$30.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.500\\text{ g}$$, $$240\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.600\\text{ g}$$, $$240\\text{ cm}^3$$, $$30.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.500\\text{ g}$$, $$120\\text{ cm}^3$$, $$40.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$0.500\\text{ g}$$, $$240\\text{ cm}^3$$, $$30.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.500\\text{ g}$$, $$240\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;

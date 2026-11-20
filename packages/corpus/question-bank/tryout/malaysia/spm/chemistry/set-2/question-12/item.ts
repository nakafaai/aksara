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
            "$$40.0\\text{ cm}^3$$, $$0.180\\text{ g}$$, $$0.214\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$50.0\\text{ cm}^3$$, $$0.214\\text{ g}$$, $$0.214\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$50.0\\text{ cm}^3$$, $$0.197\\text{ g}$$, $$0.197\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$50.0\\text{ cm}^3$$, $$0.197\\text{ g}$$, $$0.214\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$40.0\\text{ cm}^3$$, $$0.180\\text{ g}$$, $$0.214\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$50.0\\text{ cm}^3$$, $$0.214\\text{ g}$$, $$0.214\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$50.0\\text{ cm}^3$$, $$0.197\\text{ g}$$, $$0.197\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$50.0\\text{ cm}^3$$, $$0.197\\text{ g}$$, $$0.214\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;

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
            "$$1.20\\text{ g}$$, $$23.5\\text{ cm}^3$$, $$122\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.02\\text{ g}$$, $$10.0\\text{ cm}^3$$, $$120\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.02\\text{ g}$$, $$20.0\\text{ cm}^3$$, $$120\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.02\\text{ g}$$, $$20.0\\text{ cm}^3$$, $$80.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.20\\text{ g}$$, $$23.5\\text{ cm}^3$$, $$122\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.02\\text{ g}$$, $$10.0\\text{ cm}^3$$, $$120\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.02\\text{ g}$$, $$20.0\\text{ cm}^3$$, $$120\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.02\\text{ g}$$, $$20.0\\text{ cm}^3$$, $$80.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;

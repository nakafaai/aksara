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
            "X $$6.35\\text{ g}$$, Y $$6.35\\text{ g}$$, $$600\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "X $$8.13\\text{ g}$$, Y $$8.13\\text{ g}$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "X $$8.13\\text{ g}$$, Y $$6.35\\text{ g}$$, $$1200\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "X $$8.13\\text{ g}$$, Y $$6.35\\text{ g}$$, $$600\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "X $$6.35\\text{ g}$$, Y $$6.35\\text{ g}$$, $$600\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "X $$8.13\\text{ g}$$, Y $$8.13\\text{ g}$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "X $$8.13\\text{ g}$$, Y $$6.35\\text{ g}$$, $$1200\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "X $$8.13\\text{ g}$$, Y $$6.35\\text{ g}$$, $$600\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;

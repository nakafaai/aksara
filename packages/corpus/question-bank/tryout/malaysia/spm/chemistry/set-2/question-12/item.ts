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
          label: "$$240\\text{ cm}^3$$, $$1.80\\text{ g}$$, $$2.14\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$360\\text{ cm}^3$$, $$2.14\\text{ g}$$, $$2.14\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$360\\text{ cm}^3$$, $$1.97\\text{ g}$$, $$1.97\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$360\\text{ cm}^3$$, $$1.97\\text{ g}$$, $$2.14\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$240\\text{ cm}^3$$, $$1.80\\text{ g}$$, $$2.14\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$360\\text{ cm}^3$$, $$2.14\\text{ g}$$, $$2.14\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$360\\text{ cm}^3$$, $$1.97\\text{ g}$$, $$1.97\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$360\\text{ cm}^3$$, $$1.97\\text{ g}$$, $$2.14\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;

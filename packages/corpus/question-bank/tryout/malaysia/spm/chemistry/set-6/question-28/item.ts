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
          correct: true,
          label: "$$2$$, $$3.74\\text{ g}$$, $$480\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$1$$, $$2.14\\text{ g}$$, $$240\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$2$$, $$2.14\\text{ g}$$, $$480\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$2$$, $$3.74\\text{ g}$$, $$240\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$2$$, $$3.74\\text{ g}$$, $$480\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$1$$, $$2.14\\text{ g}$$, $$240\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$2$$, $$2.14\\text{ g}$$, $$480\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$2$$, $$3.74\\text{ g}$$, $$240\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;

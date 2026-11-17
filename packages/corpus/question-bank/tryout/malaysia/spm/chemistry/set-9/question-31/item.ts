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
          label: "$$240\\text{ cm}^3$$, $$8.80\\text{ g}$$, $$2.54\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$720\\text{ cm}^3$$, $$8.78\\text{ g}$$, $$7.62\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$1440\\text{ cm}^3$$, $$8.90\\text{ g}$$, $$15.2\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$720\\text{ cm}^3$$, $$8.84\\text{ g}$$, $$7.62\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$240\\text{ cm}^3$$, $$8.80\\text{ g}$$, $$2.54\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$720\\text{ cm}^3$$, $$8.78\\text{ g}$$, $$7.62\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$1440\\text{ cm}^3$$, $$8.90\\text{ g}$$, $$15.2\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$720\\text{ cm}^3$$, $$8.84\\text{ g}$$, $$7.62\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;

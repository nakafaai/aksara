import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$9.6\\text{ cm}^3\\text{ s}^{-1}$$, $$2.20\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$9.6\\text{ cm}^3\\text{ s}^{-1}$$, $$4.40\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$17.6\\text{ cm}^3\\text{ s}^{-1}$$, $$2.20\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$4.8\\text{ cm}^3\\text{ s}^{-1}$$, $$2.20\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$9.6\\text{ cm}^3\\text{ s}^{-1}$$, $$2.20\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$9.6\\text{ cm}^3\\text{ s}^{-1}$$, $$4.40\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$17.6\\text{ cm}^3\\text{ s}^{-1}$$, $$2.20\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$4.8\\text{ cm}^3\\text{ s}^{-1}$$, $$2.20\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;

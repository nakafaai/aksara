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
          correct: false,
          label:
            "$$0.0900\\text{ mol dm}^{-3}$$, $$14.4\\text{ s}$$, $$0.160\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$0.0900\\text{ mol dm}^{-3}$$, $$40\\text{ s}$$, $$0.160\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.0900\\text{ mol dm}^{-3}$$, $$40\\text{ s}$$, $$0.240\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.0600\\text{ mol dm}^{-3}$$, $$60\\text{ s}$$, $$0.160\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.0900\\text{ mol dm}^{-3}$$, $$14.4\\text{ s}$$, $$0.160\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$0.0900\\text{ mol dm}^{-3}$$, $$40\\text{ s}$$, $$0.160\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.0900\\text{ mol dm}^{-3}$$, $$40\\text{ s}$$, $$0.240\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.0600\\text{ mol dm}^{-3}$$, $$60\\text{ s}$$, $$0.160\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;

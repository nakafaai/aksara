import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "manufactured-substances-in-industry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$265\\text{ g}$$, $$96.0\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$212\\text{ g}$$, $$48.0\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$212\\text{ g}$$, $$96.0\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$212\\text{ g}$$, $$76.8\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$265\\text{ g}$$, $$96.0\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$212\\text{ g}$$, $$48.0\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$212\\text{ g}$$, $$96.0\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$212\\text{ g}$$, $$76.8\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;

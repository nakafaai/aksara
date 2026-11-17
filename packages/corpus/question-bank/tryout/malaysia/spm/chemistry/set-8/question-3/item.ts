import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$16.1\\text{ dm}^3$$, $$6.60\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$12.6\\text{ dm}^3$$, $$6.60\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$16.1\\text{ dm}^3$$, $$12.6\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$13.8\\text{ dm}^3$$, $$4.80\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$16.1\\text{ dm}^3$$, $$6.60\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$12.6\\text{ dm}^3$$, $$6.60\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$16.1\\text{ dm}^3$$, $$12.6\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$13.8\\text{ dm}^3$$, $$4.80\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;

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
          label: "$$12.2\\text{ dm}^3$$, $$4.80\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$9.60\\text{ dm}^3$$, $$4.80\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$12.2\\text{ dm}^3$$, $$9.60\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$10.7\\text{ dm}^3$$, $$3.60\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$12.2\\text{ dm}^3$$, $$4.80\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$9.60\\text{ dm}^3$$, $$4.80\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$12.2\\text{ dm}^3$$, $$9.60\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$10.7\\text{ dm}^3$$, $$3.60\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;

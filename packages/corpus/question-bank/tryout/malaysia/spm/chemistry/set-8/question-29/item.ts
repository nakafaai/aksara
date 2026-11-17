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
          label: "$$2.06\\text{ mol dm}^{-3}$$, $$118\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$2.06\\text{ mol dm}^{-3}$$, $$24.7\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$2.61\\text{ mol dm}^{-3}$$, $$149\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$2.06\\text{ mol dm}^{-3}$$, $$353\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$2.06\\text{ mol dm}^{-3}$$, $$118\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$2.06\\text{ mol dm}^{-3}$$, $$24.7\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$2.61\\text{ mol dm}^{-3}$$, $$149\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$2.06\\text{ mol dm}^{-3}$$, $$353\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;

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
          label: "$$10.0\\%$$, $$2.25\\text{ kg}$$, $$338\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$5.64\\%$$, $$2.25\\text{ kg}$$, $$338\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$5.64\\%$$, $$2.25\\text{ kg}$$, $$675\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$5.64\\%$$, $$1.80\\text{ kg}$$, $$338\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10.0\\%$$, $$2.25\\text{ kg}$$, $$338\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$5.64\\%$$, $$2.25\\text{ kg}$$, $$338\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$5.64\\%$$, $$2.25\\text{ kg}$$, $$675\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$5.64\\%$$, $$1.80\\text{ kg}$$, $$338\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$14.3\\text{ kg}$$, $$0.755\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$24.4\\text{ kg}$$, $$0.724\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$12.2\\text{ kg}$$, $$0.800\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label: "$$12.2\\text{ kg}$$, $$0.762\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$14.3\\text{ kg}$$, $$0.755\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$24.4\\text{ kg}$$, $$0.724\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$12.2\\text{ kg}$$, $$0.800\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label: "$$12.2\\text{ kg}$$, $$0.762\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;

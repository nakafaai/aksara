import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.10\\text{ mol dm}^{-3}$$, $$0.10\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label: "$$0.50\\text{ mol dm}^{-3}$$, $$0.30\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$0.25\\text{ mol dm}^{-3}$$, $$0.15\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$0.50\\text{ mol dm}^{-3}$$, $$0.10\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.10\\text{ mol dm}^{-3}$$, $$0.10\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label: "$$0.50\\text{ mol dm}^{-3}$$, $$0.30\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$0.25\\text{ mol dm}^{-3}$$, $$0.15\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$0.50\\text{ mol dm}^{-3}$$, $$0.10\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;

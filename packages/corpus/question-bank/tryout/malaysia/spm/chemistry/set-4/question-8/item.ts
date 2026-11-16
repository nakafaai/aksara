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
          correct: false,
          label: "$$0.016\\text{ mol dm}^{-3}$$, and the mixture has pH $$7$$",
        },
        {
          correct: false,
          label: "$$0.40\\text{ mol dm}^{-3}$$, and the mixture has pH $$13$$",
        },
        {
          correct: false,
          label: "$$0.40\\text{ mol dm}^{-3}$$, and the mixture has pH $$1$$",
        },
        {
          correct: true,
          label: "$$0.40\\text{ mol dm}^{-3}$$, and the mixture has pH $$7$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.016\\text{ mol dm}^{-3}$$, dan campuran itu mempunyai pH $$7$$",
        },
        {
          correct: false,
          label:
            "$$0.40\\text{ mol dm}^{-3}$$, dan campuran itu mempunyai pH $$13$$",
        },
        {
          correct: false,
          label:
            "$$0.40\\text{ mol dm}^{-3}$$, dan campuran itu mempunyai pH $$1$$",
        },
        {
          correct: true,
          label:
            "$$0.40\\text{ mol dm}^{-3}$$, dan campuran itu mempunyai pH $$7$$",
        },
      ],
    },
  },
};

export default item;

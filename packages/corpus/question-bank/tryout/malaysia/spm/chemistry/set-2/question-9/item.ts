import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.625\\text{ mol dm}^{-3}$$, $$8.05\\text{ g}$$, $$80.0\\%$$",
        },
        {
          correct: false,
          label:
            "$$1.25\\text{ mol dm}^{-3}$$, $$8.05\\text{ g}$$, $$80.0\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.625\\text{ mol dm}^{-3}$$, $$8.05\\text{ g}$$, $$125\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.625\\text{ mol dm}^{-3}$$, $$16.1\\text{ g}$$, $$40.0\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.625\\text{ mol dm}^{-3}$$, $$8.05\\text{ g}$$, $$80.0\\%$$",
        },
        {
          correct: false,
          label:
            "$$1.25\\text{ mol dm}^{-3}$$, $$8.05\\text{ g}$$, $$80.0\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.625\\text{ mol dm}^{-3}$$, $$8.05\\text{ g}$$, $$125\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.625\\text{ mol dm}^{-3}$$, $$16.1\\text{ g}$$, $$40.0\\%$$",
        },
      ],
    },
  },
};

export default item;

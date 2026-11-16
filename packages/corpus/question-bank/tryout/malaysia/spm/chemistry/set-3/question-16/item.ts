import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.176\\text{ mol dm}^{-3}$$, which is $$2.99\\text{ g dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$4.40\\text{ mol dm}^{-3}$$, which is $$74.8\\text{ g dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$0.0440\\text{ mol dm}^{-3}$$, which is $$0.748\\text{ g dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$4.40\\text{ mol dm}^{-3}$$, which is $$61.6\\text{ g dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.176\\text{ mol dm}^{-3}$$, which is $$2.99\\text{ g dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$4.40\\text{ mol dm}^{-3}$$, which is $$74.8\\text{ g dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$0.0440\\text{ mol dm}^{-3}$$, which is $$0.748\\text{ g dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$4.40\\text{ mol dm}^{-3}$$, which is $$61.6\\text{ g dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;

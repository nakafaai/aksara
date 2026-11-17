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
            "$$2.80\\text{ g}$$, $$0\\text{ mol dm}^{-3}$$, $$0.250\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$2.33\\text{ g}$$, $$0.0667\\text{ mol dm}^{-3}$$, $$0.250\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$2.33\\text{ g}$$, $$0.0250\\text{ mol dm}^{-3}$$, $$0.125\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$2.33\\text{ g}$$, $$0.0250\\text{ mol dm}^{-3}$$, $$0.250\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.80\\text{ g}$$, $$0\\text{ mol dm}^{-3}$$, $$0.250\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$2.33\\text{ g}$$, $$0.0667\\text{ mol dm}^{-3}$$, $$0.250\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$2.33\\text{ g}$$, $$0.0250\\text{ mol dm}^{-3}$$, $$0.125\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$2.33\\text{ g}$$, $$0.0250\\text{ mol dm}^{-3}$$, $$0.250\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;

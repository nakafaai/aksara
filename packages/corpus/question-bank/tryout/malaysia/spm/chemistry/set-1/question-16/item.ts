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
          correct: true,
          label: "$$1.75\\text{ g}$$ and $$0.25\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$2.33\\text{ g}$$ and $$0.25\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$1.75\\text{ g}$$ and $$0.40\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$1.75\\text{ g}$$ and $$0.125\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1.75\\text{ g}$$ dan $$0.25\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$2.33\\text{ g}$$ dan $$0.25\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$1.75\\text{ g}$$ dan $$0.40\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$1.75\\text{ g}$$ dan $$0.125\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;

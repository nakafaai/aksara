import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "movement-of-substances-across-the-plasma-membrane",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.30\\text{ mol dm}^{-3}$$ and $$4.70\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$0.35\\text{ mol dm}^{-3}$$ and $$4.70\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.35\\text{ mol dm}^{-3}$$ and $$5.30\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.40\\text{ mol dm}^{-3}$$ and $$4.90\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.30\\text{ mol dm}^{-3}$$ dan $$4.70\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$0.35\\text{ mol dm}^{-3}$$ dan $$4.70\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.35\\text{ mol dm}^{-3}$$ dan $$5.30\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.40\\text{ mol dm}^{-3}$$ dan $$4.90\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;

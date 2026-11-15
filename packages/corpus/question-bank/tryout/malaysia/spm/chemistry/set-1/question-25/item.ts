import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.64\\text{ g}$$ and $$240\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$0.64\\text{ g}$$ and $$120\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$1.28\\text{ g}$$ and $$120\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$1.28\\text{ g}$$ and $$240\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.64\\text{ g}$$ dan $$240\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$0.64\\text{ g}$$ dan $$120\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$1.28\\text{ g}$$ dan $$120\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$1.28\\text{ g}$$ dan $$240\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "measurement",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.60\\text{ g cm}^{-3}$$, and $$1.06\\text{ g cm}^{-3}$$ for the liquid",
        },
        {
          correct: false,
          label:
            "$$2.62\\text{ g cm}^{-3}$$, and $$1.06\\text{ g cm}^{-3}$$ for the liquid",
        },
        {
          correct: false,
          label:
            "$$2.60\\text{ g cm}^{-3}$$, and $$1.56\\text{ g cm}^{-3}$$ for the liquid",
        },
        {
          correct: true,
          label:
            "$$2.60\\text{ g cm}^{-3}$$, and $$1.04\\text{ g cm}^{-3}$$ for the liquid",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.60\\text{ g cm}^{-3}$$, dan $$1.06\\text{ g cm}^{-3}$$ bagi cecair",
        },
        {
          correct: false,
          label:
            "$$2.62\\text{ g cm}^{-3}$$, dan $$1.06\\text{ g cm}^{-3}$$ bagi cecair",
        },
        {
          correct: false,
          label:
            "$$2.60\\text{ g cm}^{-3}$$, dan $$1.56\\text{ g cm}^{-3}$$ bagi cecair",
        },
        {
          correct: true,
          label:
            "$$2.60\\text{ g cm}^{-3}$$, dan $$1.04\\text{ g cm}^{-3}$$ bagi cecair",
        },
      ],
    },
  },
};

export default item;

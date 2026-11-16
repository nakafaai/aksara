import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.18\\text{ g}$$ of lithium-6, and $$9.6\\text{ dm}^3$$ of hydrogen",
        },
        {
          correct: false,
          label:
            "$$1.13\\text{ g}$$ of lithium-6, and $$9.1\\text{ dm}^3$$ of hydrogen",
        },
        {
          correct: true,
          label:
            "$$1.20\\text{ g}$$ of lithium-6, and $$9.6\\text{ dm}^3$$ of hydrogen",
        },
        {
          correct: false,
          label:
            "$$1.20\\text{ g}$$ of lithium-6, and $$4.8\\text{ dm}^3$$ of hydrogen",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.18\\text{ g}$$ litium-6, dan $$9.6\\text{ dm}^3$$ hidrogen",
        },
        {
          correct: false,
          label:
            "$$1.13\\text{ g}$$ litium-6, dan $$9.1\\text{ dm}^3$$ hidrogen",
        },
        {
          correct: true,
          label:
            "$$1.20\\text{ g}$$ litium-6, dan $$9.6\\text{ dm}^3$$ hidrogen",
        },
        {
          correct: false,
          label:
            "$$1.20\\text{ g}$$ litium-6, dan $$4.8\\text{ dm}^3$$ hidrogen",
        },
      ],
    },
  },
};

export default item;

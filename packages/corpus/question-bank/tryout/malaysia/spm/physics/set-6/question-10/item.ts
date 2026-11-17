import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.48\\text{ kg s}^{-1}$$ of water, and $$3.0\\text{ kg s}^{-1}$$ of air",
        },
        {
          correct: false,
          label:
            "$$0.63\\text{ kg s}^{-1}$$ of water, and $$4.0\\text{ kg s}^{-1}$$ of air",
        },
        {
          correct: false,
          label:
            "$$1.2\\text{ kg s}^{-1}$$ of water, and $$7.5\\text{ kg s}^{-1}$$ of air",
        },
        {
          correct: false,
          label:
            "$$0.12\\text{ kg s}^{-1}$$ of water, and $$0.75\\text{ kg s}^{-1}$$ of air",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.48\\text{ kg s}^{-1}$$ air, dan $$3.0\\text{ kg s}^{-1}$$ udara",
        },
        {
          correct: false,
          label:
            "$$0.63\\text{ kg s}^{-1}$$ air, dan $$4.0\\text{ kg s}^{-1}$$ udara",
        },
        {
          correct: false,
          label:
            "$$1.2\\text{ kg s}^{-1}$$ air, dan $$7.5\\text{ kg s}^{-1}$$ udara",
        },
        {
          correct: false,
          label:
            "$$0.12\\text{ kg s}^{-1}$$ air, dan $$0.75\\text{ kg s}^{-1}$$ udara",
        },
      ],
    },
  },
};

export default item;

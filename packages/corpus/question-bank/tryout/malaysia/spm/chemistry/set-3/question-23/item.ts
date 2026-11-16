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
          label:
            "$$0.20\\text{ dm}^3$$ of oxygen, and the aluminium runs the device for about $$7$$ minutes",
        },
        {
          correct: true,
          label:
            "$$0.60\\text{ dm}^3$$ of oxygen, and the aluminium runs the device for $$20$$ minutes",
        },
        {
          correct: false,
          label:
            "$$1.20\\text{ dm}^3$$ of oxygen, and the aluminium runs the device for $$20$$ minutes",
        },
        {
          correct: false,
          label:
            "$$2.40\\text{ dm}^3$$ of oxygen, and the aluminium runs the device for $$20$$ minutes",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.20\\text{ dm}^3$$ oksigen, dan aluminium itu menghidupkan peranti selama kira-kira $$7$$ minit",
        },
        {
          correct: true,
          label:
            "$$0.60\\text{ dm}^3$$ oksigen, dan aluminium itu menghidupkan peranti selama $$20$$ minit",
        },
        {
          correct: false,
          label:
            "$$1.20\\text{ dm}^3$$ oksigen, dan aluminium itu menghidupkan peranti selama $$20$$ minit",
        },
        {
          correct: false,
          label:
            "$$2.40\\text{ dm}^3$$ oksigen, dan aluminium itu menghidupkan peranti selama $$20$$ minit",
        },
      ],
    },
  },
};

export default item;

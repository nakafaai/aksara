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
          label: "$$0.24\\text{ dm}^3$$ of oxygen, and the pH decreases",
        },
        {
          correct: false,
          label: "$$0.12\\text{ dm}^3$$ of oxygen, and the pH increases",
        },
        {
          correct: true,
          label: "$$0.12\\text{ dm}^3$$ of oxygen, and the pH decreases",
        },
        {
          correct: false,
          label:
            "$$0.12\\text{ dm}^3$$ of hydrogen, and the pH does not change",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.24\\text{ dm}^3$$ oksigen, dan pH berkurang",
        },
        {
          correct: false,
          label: "$$0.12\\text{ dm}^3$$ oksigen, dan pH bertambah",
        },
        {
          correct: true,
          label: "$$0.12\\text{ dm}^3$$ oksigen, dan pH berkurang",
        },
        {
          correct: false,
          label: "$$0.12\\text{ dm}^3$$ hidrogen, dan pH tidak berubah",
        },
      ],
    },
  },
};

export default item;

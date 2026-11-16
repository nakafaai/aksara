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
            "$$1.28\\text{ g}$$ of copper, and $$0.24\\text{ dm}^3$$ of oxygen",
        },
        {
          correct: false,
          label:
            "$$0.64\\text{ g}$$ of copper, and $$0.24\\text{ dm}^3$$ of oxygen",
        },
        {
          correct: true,
          label:
            "$$0.64\\text{ g}$$ of copper, and $$0.12\\text{ dm}^3$$ of oxygen",
        },
        {
          correct: false,
          label:
            "$$0.64\\text{ g}$$ of copper, and $$0.24\\text{ dm}^3$$ of hydrogen",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.28\\text{ g}$$ kuprum, dan $$0.24\\text{ dm}^3$$ oksigen",
        },
        {
          correct: false,
          label: "$$0.64\\text{ g}$$ kuprum, dan $$0.24\\text{ dm}^3$$ oksigen",
        },
        {
          correct: true,
          label: "$$0.64\\text{ g}$$ kuprum, dan $$0.12\\text{ dm}^3$$ oksigen",
        },
        {
          correct: false,
          label:
            "$$0.64\\text{ g}$$ kuprum, dan $$0.24\\text{ dm}^3$$ hidrogen",
        },
      ],
    },
  },
};

export default item;

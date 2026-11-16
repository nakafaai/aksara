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
            "Hydrogen is used at the positive terminal, $$2.4\\text{ dm}^3$$, and $$1.2\\text{ dm}^3$$ of oxygen",
        },
        {
          correct: false,
          label:
            "$$2.4\\text{ dm}^3$$ of hydrogen and $$2.4\\text{ dm}^3$$ of oxygen are used",
        },
        {
          correct: true,
          label:
            "$$2.4\\text{ dm}^3$$ of hydrogen is used at the negative terminal, $$1.2\\text{ dm}^3$$ of oxygen is used, and $$1.8\\text{ g}$$ of water forms overall",
        },
        {
          correct: false,
          label:
            "$$4.8\\text{ dm}^3$$ of hydrogen and $$1.2\\text{ dm}^3$$ of oxygen are used",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Hidrogen digunakan di terminal positif, $$2.4\\text{ dm}^3$$, dan $$1.2\\text{ dm}^3$$ oksigen",
        },
        {
          correct: false,
          label:
            "$$2.4\\text{ dm}^3$$ hidrogen dan $$2.4\\text{ dm}^3$$ oksigen digunakan",
        },
        {
          correct: true,
          label:
            "$$2.4\\text{ dm}^3$$ hidrogen digunakan di terminal negatif, $$1.2\\text{ dm}^3$$ oksigen digunakan, dan $$1.8\\text{ g}$$ air terbentuk secara keseluruhan",
        },
        {
          correct: false,
          label:
            "$$4.8\\text{ dm}^3$$ hidrogen dan $$1.2\\text{ dm}^3$$ oksigen digunakan",
        },
      ],
    },
  },
};

export default item;

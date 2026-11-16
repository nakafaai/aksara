import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6.0\\text{ dm}^3$$ of gas leaves, holding $$2.01 \\times 10^{22}$$ ozone molecules",
        },
        {
          correct: false,
          label:
            "$$4.8\\text{ dm}^3$$ of gas leaves, holding $$2.01 \\times 10^{22}$$ ozone molecules",
        },
        {
          correct: true,
          label:
            "$$5.6\\text{ dm}^3$$ of gas leaves, holding $$2.01 \\times 10^{22}$$ ozone molecules",
        },
        {
          correct: false,
          label:
            "$$5.6\\text{ dm}^3$$ of gas leaves, holding $$3.01 \\times 10^{22}$$ ozone molecules",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6.0\\text{ dm}^3$$ gas keluar, mengandungi $$2.01 \\times 10^{22}$$ molekul ozon",
        },
        {
          correct: false,
          label:
            "$$4.8\\text{ dm}^3$$ gas keluar, mengandungi $$2.01 \\times 10^{22}$$ molekul ozon",
        },
        {
          correct: true,
          label:
            "$$5.6\\text{ dm}^3$$ gas keluar, mengandungi $$2.01 \\times 10^{22}$$ molekul ozon",
        },
        {
          correct: false,
          label:
            "$$5.6\\text{ dm}^3$$ gas keluar, mengandungi $$3.01 \\times 10^{22}$$ molekul ozon",
        },
      ],
    },
  },
};

export default item;

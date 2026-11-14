import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "explicit-information",
  },
  stimulus: "reservoir",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Grandmother was $$12$$ when the valley filled with water.",
        },
        {
          correct: false,
          label:
            "The steps were counted about two years before Grandmother's family was moved out.",
        },
        {
          correct: false,
          label:
            "The tamarind seed had been in Grandmother's keeping since the year she started school.",
        },
        {
          correct: false,
          label:
            "Grandmother started school in the same year that the dam gates were closed.",
        },
        {
          correct: true,
          label:
            "Grandmother was at least $$14$$ when the valley filled, and the steps had been counted about five years before her family moved.",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "ibn-battuta",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "His great wealth, which he had inherited from a merchant family in Tangier",
        },
        {
          correct: false,
          label:
            "His skill as a ship's captain on long voyages across the Indian Ocean",
        },
        {
          correct: false,
          label:
            "His letters of introduction from the sultan of Morocco before he left",
        },
        {
          correct: true,
          label:
            "His training in Islamic law, which made him valued as a judge",
        },
        {
          correct: false,
          label:
            "His fame as the author of the *Rihla*, which rulers had already read",
        },
      ],
    },
  },
};

export default item;

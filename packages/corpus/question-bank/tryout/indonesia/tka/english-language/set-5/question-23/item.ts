import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  stimulus: "library-hours",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The log proves that 58 different students visit the library every afternoon.",
        },
        {
          correct: true,
          label:
            "Visits are highest in the two hours before the library closes.",
        },
        {
          correct: false,
          label:
            "Most of the survey answers came from students who do not use the library.",
        },
        {
          correct: true,
          label:
            "The number of visits rises from the morning to the early afternoon.",
        },
      ],
    },
  },
};

export default item;

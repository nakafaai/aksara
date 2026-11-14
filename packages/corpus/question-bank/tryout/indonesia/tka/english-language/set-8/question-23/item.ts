import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  stimulus: "class-cleaning",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Sweeping takes about half of a duty team's total time.",
        },
        {
          correct: false,
          label: "Emptying the bins takes the longest of the three tasks.",
        },
        {
          correct: true,
          label: "The duty team finishes its tasks before the first bell.",
        },
        {
          correct: false,
          label: "The tasks were timed over a whole semester.",
        },
      ],
    },
  },
};

export default item;

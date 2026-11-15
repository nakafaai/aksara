import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  stimulus: "late-start",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "A 6:45 start is hard on teenagers.",
        },
        {
          correct: false,
          label: "The later start raised first-lesson marks by $$5$$ points.",
        },
        {
          correct: true,
          label:
            "The share of students arriving late at the three schools fell by $$8$$ percentage points.",
        },
        {
          correct: false,
          label: "SMA Cahaya should start at 8:00.",
        },
        {
          correct: true,
          label: "The three schools moved their start time.",
        },
      ],
    },
  },
};

export default item;

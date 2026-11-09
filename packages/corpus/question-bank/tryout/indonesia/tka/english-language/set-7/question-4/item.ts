import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "comparison",
  },
  stimulus: "pottery-village",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "They fire their pots during the day instead of at night.",
        },
        {
          correct: false,
          label: "They use clay brought from another village.",
        },
        {
          correct: true,
          label: "They use electric wheels instead of wheels turned by foot.",
        },
        {
          correct: false,
          label: "They no longer finish the edges of their pots by hand.",
        },
        {
          correct: false,
          label: "They make only tiny cups for the village shop.",
        },
      ],
    },
  },
};

export default item;

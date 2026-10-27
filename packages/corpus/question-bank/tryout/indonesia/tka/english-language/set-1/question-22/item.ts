import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  stimulus: "later-start",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Use several outcome measures.",
        },
        {
          correct: true,
          label: "Look for effects hidden by an average.",
        },
        {
          correct: false,
          label:
            "Treat a higher overall mean as enough to justify permanent adoption.",
        },
        {
          correct: true,
          label: "Keep the change reversible.",
        },
      ],
    },
  },
};

export default item;

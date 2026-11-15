import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "main-idea-purpose",
  },
  stimulus: "late-start",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I, II, and IV only",
        },
        {
          correct: false,
          label: "II, IV, and V only",
        },
        {
          correct: false,
          label: "I, II, III, and IV only",
        },
        {
          correct: true,
          label: "I, II, IV, and V only",
        },
        {
          correct: false,
          label: "I and IV only",
        },
      ],
    },
  },
};

export default item;

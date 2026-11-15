import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "summary",
  },
  stimulus: "sweet-drinks",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I and IV only",
        },
        {
          correct: false,
          label: "I, II, IV, and V only",
        },
        {
          correct: false,
          label: "II and IV only",
        },
        {
          correct: true,
          label: "I, II, and IV only",
        },
        {
          correct: false,
          label: "I, II, III, and IV only",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "supporting-detail",
  },
  stimulus: "meadow",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I and II only",
        },
        {
          correct: false,
          label: "I, II, III, and IV",
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
          label: "I, III, and IV only",
        },
      ],
    },
  },
};

export default item;

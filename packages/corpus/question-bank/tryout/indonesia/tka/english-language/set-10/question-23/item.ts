import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "supporting-detail",
  },
  stimulus: "bike-racks",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "I and IV only",
        },
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
          label: "III and IV only",
        },
        {
          correct: false,
          label: "I, II, and IV only",
        },
      ],
    },
  },
};

export default item;

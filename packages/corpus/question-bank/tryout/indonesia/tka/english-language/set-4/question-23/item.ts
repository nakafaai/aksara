import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "supporting-detail",
  },
  stimulus: "homework-cap",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I only",
        },
        {
          correct: false,
          label: "I, II, and III only",
        },
        {
          correct: false,
          label: "I, II, III, and IV",
        },
        {
          correct: false,
          label: "II and III only",
        },
        {
          correct: true,
          label: "I and II only",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "supporting-detail",
  },
  stimulus: "fire-drill",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I, II, and III only",
        },
        {
          correct: false,
          label: "II, III, and IV only",
        },
        {
          correct: true,
          label: "I, II, III, and IV only",
        },
        {
          correct: false,
          label: "I, II, III, IV, and V",
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

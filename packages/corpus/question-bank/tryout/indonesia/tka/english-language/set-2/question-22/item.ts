import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "supporting-detail",
  },
  stimulus: "observatory",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "I, II, and IV only",
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
          label: "II, III, and IV only",
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

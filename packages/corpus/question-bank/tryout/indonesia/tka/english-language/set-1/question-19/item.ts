import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "supporting-detail",
  },
  stimulus: "boardwalk",
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
          correct: true,
          label: "I and II only",
        },
        {
          correct: false,
          label: "II and IV only",
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

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "supporting-detail",
  },
  stimulus: "chili-seedlings",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "II and III only",
        },
        {
          correct: false,
          label: "I, II, III, and IV only",
        },
        {
          correct: false,
          label: "I and II only",
        },
        {
          correct: false,
          label: "II, III, and V only",
        },
        {
          correct: true,
          label: "I, II, and III only",
        },
      ],
    },
  },
};

export default item;

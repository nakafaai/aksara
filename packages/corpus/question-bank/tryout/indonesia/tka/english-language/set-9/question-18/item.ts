import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "supporting-detail",
  },
  stimulus: "bread-rolls",
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
          label: "I, II, and IV only",
        },
        {
          correct: false,
          label: "II and III only",
        },
        {
          correct: true,
          label: "I, II, and III only",
        },
        {
          correct: false,
          label: "I, II, III, and V only",
        },
      ],
    },
  },
};

export default item;

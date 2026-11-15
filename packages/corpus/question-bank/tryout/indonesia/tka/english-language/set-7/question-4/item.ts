import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "cause-effect",
  },
  stimulus: "island-ferry",
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
          label: "I, II, III, and V only",
        },
        {
          correct: false,
          label: "I and III only",
        },
        {
          correct: false,
          label: "II, III, and IV only",
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

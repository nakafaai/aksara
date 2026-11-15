import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "cause-effect",
  },
  stimulus: "bike-share",
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
          label: "I and IV only",
        },
        {
          correct: false,
          label: "I, II, III, and IV only",
        },
        {
          correct: false,
          label: "II, IV, and V only",
        },
        {
          correct: false,
          label: "I, II, IV, and V only",
        },
      ],
    },
  },
};

export default item;

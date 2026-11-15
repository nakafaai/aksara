import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "summary",
  },
  stimulus: "radio-shop",
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
          label: "I, II, III, and IV only",
        },
        {
          correct: false,
          label: "I, II, IV, and V only",
        },
        {
          correct: false,
          label: "II and IV only",
        },
        {
          correct: false,
          label: "I and II only",
        },
      ],
    },
  },
};

export default item;

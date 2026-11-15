import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "synthesis",
  },
  stimulus: "radio-shop",
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
          label: "II and III only",
        },
        {
          correct: false,
          label: "I, II, and IV only",
        },
        {
          correct: true,
          label: "I and II only",
        },
        {
          correct: false,
          label: "III and IV only",
        },
      ],
    },
  },
};

export default item;

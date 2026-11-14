import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "outline",
  },
  stimulus: "gauge",
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
          label: "II only",
        },
        {
          correct: true,
          label: "II and III only",
        },
        {
          correct: false,
          label: "II, III, and IV only",
        },
        {
          correct: false,
          label: "I, II, and III only",
        },
      ],
    },
  },
};

export default item;

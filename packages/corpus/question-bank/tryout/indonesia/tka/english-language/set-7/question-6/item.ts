import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "summary",
  },
  stimulus: "bridge-count",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "I and II only",
        },
        {
          correct: false,
          label: "I, II, and III only",
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
          correct: false,
          label: "I, II, III, and IV",
        },
      ],
    },
  },
};

export default item;

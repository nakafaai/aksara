import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "summary",
  },
  stimulus: "relay-ride",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "II and III only",
        },
        {
          correct: true,
          label: "II, III, and IV only",
        },
        {
          correct: false,
          label: "I, II, and III only",
        },
        {
          correct: false,
          label: "I, II, III, and IV",
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

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "main-idea-purpose",
  },
  stimulus: "relay-ride",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I and IV only",
        },
        {
          correct: false,
          label: "I, II, III, and IV only",
        },
        {
          correct: true,
          label: "I, III, and IV only",
        },
        {
          correct: false,
          label: "III and IV only",
        },
        {
          correct: false,
          label: "I, III, IV, and V only",
        },
      ],
    },
  },
};

export default item;

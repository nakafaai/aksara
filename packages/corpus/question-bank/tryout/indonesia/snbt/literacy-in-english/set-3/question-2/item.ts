import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "word-meaning",
  },
  stimulus: "bird-compass",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "hidden behind.",
        },
        {
          correct: false,
          label: "replaced by.",
        },
        {
          correct: true,
          label: "laid on top of.",
        },
        {
          correct: false,
          label: "reflected off.",
        },
        {
          correct: false,
          label: "blurred into.",
        },
      ],
    },
  },
};

export default item;

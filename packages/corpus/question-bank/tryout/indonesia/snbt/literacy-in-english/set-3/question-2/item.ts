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
          label: "hidden away behind.",
        },
        {
          correct: false,
          label: "replaced entirely by.",
        },
        {
          correct: true,
          label: "laid on top of.",
        },
        {
          correct: false,
          label: "reflected back off.",
        },
        {
          correct: false,
          label: "blurred together into.",
        },
      ],
    },
  },
};

export default item;

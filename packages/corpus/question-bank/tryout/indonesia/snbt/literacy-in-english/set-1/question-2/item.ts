import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "word-meaning",
  },
  stimulus: "octopus-arms",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "spoken aloud.",
        },
        {
          correct: false,
          label: "recorded.",
        },
        {
          correct: true,
          label: "commanded.",
        },
        {
          correct: false,
          label: "predicted.",
        },
        {
          correct: false,
          label: "interrupted.",
        },
      ],
    },
  },
};

export default item;

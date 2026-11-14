import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "word-choice",
  },
  stimulus: "gelasan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "diacuhkan",
        },
        {
          correct: false,
          label: "dilupakan",
        },
        {
          correct: false,
          label: "disalahpahami",
        },
        {
          correct: false,
          label: "dipertanyakan",
        },
        {
          correct: true,
          label: "diabaikan",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "word-choice",
  },
  stimulus: "bantaran",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "merintis",
        },
        {
          correct: false,
          label: "menjiplak",
        },
        {
          correct: true,
          label: "mengadopsi",
        },
        {
          correct: false,
          label: "mewarisi",
        },
        {
          correct: false,
          label: "menularkan",
        },
      ],
    },
  },
};

export default item;

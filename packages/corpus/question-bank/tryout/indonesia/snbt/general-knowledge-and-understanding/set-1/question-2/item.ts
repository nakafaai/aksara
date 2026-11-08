import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "word-relation",
    topic: "antonym",
  },
  stimulus: "leuit",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "rentan",
        },
        {
          correct: false,
          label: "kebal",
        },
        {
          correct: false,
          label: "awet",
        },
        {
          correct: false,
          label: "kuat",
        },
        {
          correct: false,
          label: "tabah",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "word-relation",
    topic: "antonym",
  },
  stimulus: "rempah",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "melonjak",
        },
        {
          correct: false,
          label: "menurun",
        },
        {
          correct: false,
          label: "berkurang",
        },
        {
          correct: false,
          label: "jatuh",
        },
        {
          correct: false,
          label: "anjlok",
        },
      ],
    },
  },
};

export default item;

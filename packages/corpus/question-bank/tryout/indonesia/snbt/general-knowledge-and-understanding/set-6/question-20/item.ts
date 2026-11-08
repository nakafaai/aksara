import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "word-relation",
    topic: "antonym",
  },
  stimulus: "biopori",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "mencukupi",
        },
        {
          correct: true,
          label: "kurang",
        },
        {
          correct: false,
          label: "banyak",
        },
        {
          correct: false,
          label: "tepat",
        },
        {
          correct: false,
          label: "layak",
        },
      ],
    },
  },
};

export default item;

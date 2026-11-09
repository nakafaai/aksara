import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "word-relation",
    topic: "synonym",
  },
  stimulus: "hoaks",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "mudah",
        },
        {
          correct: false,
          label: "cepat",
        },
        {
          correct: true,
          label: "dapat dipercaya",
        },
        {
          correct: false,
          label: "mahal",
        },
        {
          correct: false,
          label: "sulit dimengerti",
        },
      ],
    },
  },
};

export default item;

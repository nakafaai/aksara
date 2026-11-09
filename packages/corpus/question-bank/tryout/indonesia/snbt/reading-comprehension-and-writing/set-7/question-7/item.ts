import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "word-meaning",
  },
  stimulus: "sign-language",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "berjumlah banyak",
        },
        {
          correct: true,
          label: "bermacam-macam",
        },
        {
          correct: false,
          label: "berpakaian seragam",
        },
        {
          correct: false,
          label: "berusia sama",
        },
        {
          correct: false,
          label: "berasal dari satu kantor",
        },
      ],
    },
  },
};

export default item;

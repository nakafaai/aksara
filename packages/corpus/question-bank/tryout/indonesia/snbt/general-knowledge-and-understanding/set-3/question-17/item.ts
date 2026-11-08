import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "word-relation",
    topic: "synonym",
  },
  stimulus: "lebah",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "seragam",
        },
        {
          correct: false,
          label: "sedikit",
        },
        {
          correct: true,
          label: "bermacam-macam",
        },
        {
          correct: false,
          label: "tersembunyi",
        },
        {
          correct: false,
          label: "sederhana",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "word-relation",
    topic: "antonym",
  },
  stimulus: "pinisi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kuno",
        },
        {
          correct: true,
          label: "modern",
        },
        {
          correct: false,
          label: "adat",
        },
        {
          correct: false,
          label: "lokal",
        },
        {
          correct: false,
          label: "klasik",
        },
      ],
    },
  },
};

export default item;

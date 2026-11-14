import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "word-relation",
    topic: "analogy",
  },
  stimulus: "delta",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "sungai : sedimentasi",
        },
        {
          correct: false,
          label: "pasir : gumuk",
        },
        {
          correct: false,
          label: "sungai : ngarai",
        },
        {
          correct: true,
          label: "angin : gumuk",
        },
        {
          correct: false,
          label: "gunung api : kawah",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "word-relation",
    topic: "analogy",
  },
  stimulus: "gamelan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "pedal : sepeda",
        },
        {
          correct: false,
          label: "penyetel : gamelan",
        },
        {
          correct: false,
          label: "gending : pesinden",
        },
        {
          correct: false,
          label: "laras : slendro",
        },
        {
          correct: false,
          label: "kikir : logam",
        },
      ],
    },
  },
};

export default item;

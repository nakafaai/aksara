import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "word-relation",
    topic: "antonym",
  },
  stimulus: "batik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "sama",
        },
        {
          correct: true,
          label: "beragam",
        },
        {
          correct: false,
          label: "teratur",
        },
        {
          correct: false,
          label: "rapi",
        },
        {
          correct: false,
          label: "berulang",
        },
      ],
    },
  },
};

export default item;

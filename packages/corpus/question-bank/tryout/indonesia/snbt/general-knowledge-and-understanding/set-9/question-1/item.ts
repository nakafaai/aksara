import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "tenun",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "dijemur di bawah sinar matahari",
        },
        {
          correct: true,
          label: "dimasukkan ke dalam cairan",
        },
        {
          correct: false,
          label: "dipukul-pukul dengan kayu",
        },
        {
          correct: false,
          label: "digulung pada sebatang kayu",
        },
        {
          correct: false,
          label: "dijahit pada selembar kain",
        },
      ],
    },
  },
};

export default item;

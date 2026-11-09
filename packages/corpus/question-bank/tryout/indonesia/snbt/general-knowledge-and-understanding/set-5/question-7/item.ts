import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "word-relation",
    topic: "analogy",
  },
  stimulus: "petir",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "hujan : payung",
        },
        {
          correct: true,
          label: "api : asap",
        },
        {
          correct: false,
          label: "awan : langit",
        },
        {
          correct: false,
          label: "guru : sekolah",
        },
        {
          correct: false,
          label: "angin : topan",
        },
      ],
    },
  },
};

export default item;

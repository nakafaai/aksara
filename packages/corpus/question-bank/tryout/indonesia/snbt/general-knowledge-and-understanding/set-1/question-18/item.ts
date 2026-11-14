import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "word-relation",
    topic: "synonym",
  },
  stimulus: "litium",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "cara",
        },
        {
          correct: false,
          label: "arah",
        },
        {
          correct: false,
          label: "upaya",
        },
        {
          correct: true,
          label: "lintasan",
        },
        {
          correct: false,
          label: "peluang",
        },
      ],
    },
  },
};

export default item;

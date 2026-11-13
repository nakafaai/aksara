import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "word-relation",
    topic: "synonym",
  },
  stimulus: "gang",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "dinilai",
        },
        {
          correct: false,
          label: "distempel",
        },
        {
          correct: false,
          label: "diukur",
        },
        {
          correct: false,
          label: "ditetapkan",
        },
        {
          correct: true,
          label: "dianggap",
        },
      ],
    },
  },
};

export default item;

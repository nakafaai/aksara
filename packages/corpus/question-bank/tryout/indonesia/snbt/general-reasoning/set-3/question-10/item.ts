import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "letter-pattern",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "KNSW",
        },
        {
          correct: true,
          label: "NSWK",
        },
        {
          correct: false,
          label: "JOSG",
        },
        {
          correct: false,
          label: "WKNS",
        },
        {
          correct: false,
          label: "MRVJ",
        },
      ],
    },
  },
};

export default item;

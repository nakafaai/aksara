import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "deductive-reasoning",
    topic: "rule-application",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Ani",
        },
        {
          correct: false,
          label: "Budi",
        },
        {
          correct: false,
          label: "Cici",
        },
        {
          correct: true,
          label: "Dedi",
        },
        {
          correct: false,
          label: "Eka",
        },
      ],
    },
  },
};

export default item;

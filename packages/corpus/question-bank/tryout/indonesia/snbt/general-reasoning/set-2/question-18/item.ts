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
          label: "Gita",
        },
        {
          correct: false,
          label: "Hadi",
        },
        {
          correct: true,
          label: "Ilham",
        },
        {
          correct: false,
          label: "Jihan",
        },
        {
          correct: false,
          label: "Kurnia",
        },
      ],
    },
  },
};

export default item;

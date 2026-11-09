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
          label: "Elsa saja",
        },
        {
          correct: false,
          label: "Ayu, Bagas, dan Elsa",
        },
        {
          correct: false,
          label: "Ayu, Citra, dan Elsa",
        },
        {
          correct: true,
          label: "Ayu dan Elsa",
        },
        {
          correct: false,
          label: "Ayu, Dimas, dan Elsa",
        },
      ],
    },
  },
};

export default item;

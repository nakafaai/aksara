import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "truth-teller",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Raka jujur, Sekar jujur, dan Tegar pembohong.",
        },
        {
          correct: false,
          label: "Raka jujur, Sekar pembohong, dan Tegar jujur.",
        },
        {
          correct: false,
          label: "Raka pembohong, Sekar jujur, dan Tegar pembohong.",
        },
        {
          correct: true,
          label: "Raka pembohong, Sekar jujur, dan Tegar jujur.",
        },
        {
          correct: false,
          label: "Raka jujur, Sekar pembohong, dan Tegar pembohong.",
        },
      ],
    },
  },
};

export default item;

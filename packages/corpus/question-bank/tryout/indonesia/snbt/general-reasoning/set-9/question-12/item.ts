import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "constructive-dilemma",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Andi dan Budi sama-sama hadir dalam rapat.",
        },
        {
          correct: false,
          label: "Andi hadir dalam rapat.",
        },
        {
          correct: true,
          label: "Andi hadir atau Budi hadir dalam rapat.",
        },
        {
          correct: false,
          label: "Budi hadir dalam rapat.",
        },
        {
          correct: false,
          label: "Andi dan Budi sama-sama tidak hadir dalam rapat.",
        },
      ],
    },
  },
};

export default item;

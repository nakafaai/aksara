import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "ordering",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Q adalah kotak paling ringan.",
        },
        {
          correct: false,
          label: "S lebih berat daripada T.",
        },
        {
          correct: false,
          label: "R lebih ringan daripada Q.",
        },
        {
          correct: true,
          label: "P adalah kotak paling berat.",
        },
        {
          correct: false,
          label: "T adalah kotak terberat kedua.",
        },
      ],
    },
  },
};

export default item;

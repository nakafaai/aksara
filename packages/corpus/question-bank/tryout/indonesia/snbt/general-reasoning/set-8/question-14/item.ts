import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "ordering",
  },
  stimulus: "lagu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Lagu S dinyanyikan pada urutan pertama.",
        },
        {
          correct: false,
          label: "Lagu U dinyanyikan pada urutan terakhir.",
        },
        {
          correct: true,
          label: "Lagu Q tidak dinyanyikan pada urutan pertama maupun kedua.",
        },
        {
          correct: false,
          label: "Lagu P dinyanyikan pada urutan pertama.",
        },
        {
          correct: false,
          label: "Lagu T dinyanyikan pada urutan ketiga.",
        },
      ],
    },
  },
};

export default item;

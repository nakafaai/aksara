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
          label: "Lagu S dinyanyikan pada urutan ketiga.",
        },
        {
          correct: false,
          label: "Lagu T dinyanyikan pada urutan kelima.",
        },
        {
          correct: false,
          label: "Lagu Q dinyanyikan pada urutan terakhir.",
        },
        {
          correct: true,
          label: "Lagu P dinyanyikan pada urutan kedua.",
        },
        {
          correct: false,
          label: "Lagu R dinyanyikan pada urutan keempat.",
        },
      ],
    },
  },
};

export default item;

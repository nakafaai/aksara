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
          label: "Sekar adalah yang termuda di antara mereka.",
        },
        {
          correct: false,
          label: "Tegar lebih tua daripada Oki.",
        },
        {
          correct: false,
          label: "Rafi adalah yang tertua di antara mereka.",
        },
        {
          correct: false,
          label: "Wulan lebih tua daripada Tegar.",
        },
        {
          correct: true,
          label: "Rafi lebih tua daripada Sekar.",
        },
      ],
    },
  },
};

export default item;

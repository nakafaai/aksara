import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "ranking",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sita adalah yang termuda di antara kelima bersaudara itu.",
        },
        {
          correct: false,
          label: "Tomi lebih tua daripada Umi.",
        },
        {
          correct: false,
          label: "Selisih usia Rara dan Vino adalah $$6$$ tahun.",
        },
        {
          correct: false,
          label: "Umi $$2$$ tahun lebih tua daripada Sita.",
        },
        {
          correct: true,
          label: "Selisih usia Umi dan Vino adalah $$6$$ tahun.",
        },
      ],
    },
  },
};

export default item;

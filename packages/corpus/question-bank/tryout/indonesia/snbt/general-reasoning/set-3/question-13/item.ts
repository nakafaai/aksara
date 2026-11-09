import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "negation",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Hari ini libur dan ada toko di pasar itu yang tidak tutup.",
        },
        {
          correct: false,
          label: "Hari ini tidak libur dan semua toko di pasar itu buka.",
        },
        {
          correct: false,
          label: "Jika hari ini tidak libur, ada toko di pasar itu yang buka.",
        },
        {
          correct: false,
          label: "Hari ini libur dan semua toko di pasar itu buka.",
        },
        {
          correct: false,
          label: "Hari ini tidak libur atau semua toko di pasar itu tutup.",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Audit telah selesai.",
        },
        {
          correct: false,
          label: "Audit dibatalkan.",
        },
        {
          correct: false,
          label: "Status audit tidak dapat disimpulkan.",
        },
        {
          correct: true,
          label: "Audit belum selesai.",
        },
        {
          correct: false,
          label: "Audit selesai, tetapi kuota tidak tersedia.",
        },
      ],
    },
  },
};

export default item;

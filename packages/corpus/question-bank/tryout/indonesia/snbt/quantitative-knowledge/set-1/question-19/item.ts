import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "(1), (2), dan (3) SAJA yang benar",
        },
        {
          correct: true,
          label: "(4) SAJA yang benar",
        },
        {
          correct: false,
          label: "(1) dan (3) SAJA yang benar",
        },
        {
          correct: false,
          label: "(2) dan (4) SAJA yang benar",
        },
        {
          correct: false,
          label: "SEMUA pernyataan benar",
        },
      ],
    },
  },
};

export default item;

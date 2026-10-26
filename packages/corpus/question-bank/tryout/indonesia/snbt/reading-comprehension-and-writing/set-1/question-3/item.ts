import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "produk.",
        },
        {
          correct: false,
          label: "produktif.",
        },
        {
          correct: true,
          label: "produktivitas.",
        },
        {
          correct: false,
          label: "produksi.",
        },
        {
          correct: false,
          label: "produsen.",
        },
      ],
    },
  },
};

export default item;

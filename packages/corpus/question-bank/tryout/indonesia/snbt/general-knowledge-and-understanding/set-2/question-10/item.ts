import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "pencernaan sempurna.",
        },
        {
          correct: true,
          label: "penyerapan yang tidak sempurna.",
        },
        {
          correct: false,
          label: "fermentasi cepat.",
        },
        {
          correct: false,
          label: "produksi enzim berlebih.",
        },
        {
          correct: false,
          label: "kesukaan terhadap makanan.",
        },
      ],
    },
  },
};

export default item;

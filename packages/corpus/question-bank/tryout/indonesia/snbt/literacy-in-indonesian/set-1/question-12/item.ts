import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Ilmu",
        },
        {
          correct: true,
          label: "Nasihat",
        },
        {
          correct: false,
          label: "Pengalaman",
        },
        {
          correct: false,
          label: "Kesan",
        },
        {
          correct: false,
          label: "Perasaan",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Komik dan novel",
        },
        {
          correct: true,
          label: "Dongeng dan pengetahuan",
        },
        {
          correct: false,
          label: "Cerita fiksi dan komik",
        },
        {
          correct: false,
          label: "Dongeng dan penelitian",
        },
        {
          correct: false,
          label: "Cerita fiksi dan keagamaan",
        },
      ],
    },
  },
};

export default item;

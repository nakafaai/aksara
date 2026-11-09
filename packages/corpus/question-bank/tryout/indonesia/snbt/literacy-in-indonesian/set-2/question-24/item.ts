import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "Asia Selatan" },
        {
          correct: false,
          label: "Mediterania timur",
        },
        { correct: false, label: "Asia Tenggara" },
        { correct: false, label: "Afrika Barat" },
        { correct: false, label: "Eropa Utara" },
      ],
    },
  },
};

export default item;

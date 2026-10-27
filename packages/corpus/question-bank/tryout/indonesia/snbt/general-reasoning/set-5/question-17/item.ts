import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sumbangan konsumsi rumah tangga tetap tepat $$2{,}74$$ poin persentase",
        },
        {
          correct: true,
          label:
            "Sumbangan konsumsi rumah tangga berada di bawah $$2{,}74$$ poin persentase",
        },
        {
          correct: false,
          label:
            "Sumbangan investasi pasti turun di bawah $$2{,}17$$ poin persentase",
        },
        {
          correct: false,
          label: "Pertumbuhan ekonomi total pasti menjadi negatif",
        },
        {
          correct: false,
          label: "Konsumsi rumah tangga tidak memberikan sumbangan sama sekali",
        },
      ],
    },
  },
};

export default item;

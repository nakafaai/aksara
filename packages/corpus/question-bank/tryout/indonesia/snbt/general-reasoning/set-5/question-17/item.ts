import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sumbangan konsumsi rumah tangga tetap tepat $$2{,}74$$ poin persentase",
        },
        {
          isCorrect: true,
          label:
            "Sumbangan konsumsi rumah tangga berada di bawah $$2{,}74$$ poin persentase",
        },
        {
          isCorrect: false,
          label:
            "Sumbangan investasi pasti turun di bawah $$2{,}17$$ poin persentase",
        },
        {
          isCorrect: false,
          label: "Pertumbuhan ekonomi total pasti menjadi negatif",
        },
        {
          isCorrect: false,
          label: "Konsumsi rumah tangga tidak memberikan sumbangan sama sekali",
        },
      ],
    },
  },
};

export default item;

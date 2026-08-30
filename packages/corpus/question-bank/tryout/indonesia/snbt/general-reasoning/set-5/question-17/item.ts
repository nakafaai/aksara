import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Der Beitrag des privaten Konsums bliebe genau bei $$2{,}74$$ Prozentpunkten",
        },
        {
          isCorrect: false,
          label:
            "Der Investitionsbeitrag müsste unter $$2{,}17$$ Prozentpunkte fallen",
        },
        {
          isCorrect: false,
          label: "Das gesamte Wirtschaftswachstum müsste negativ werden",
        },
        {
          isCorrect: true,
          label:
            "Der Beitrag des privaten Konsums läge unter $$2{,}74$$ Prozentpunkten",
        },
        {
          isCorrect: false,
          label: "Der private Konsum würde keinen Beitrag leisten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The household-consumption contribution would remain exactly $$2.74$$ percentage points",
        },
        {
          isCorrect: false,
          label:
            "The investment contribution would necessarily fall below $$2.17$$ percentage points",
        },
        {
          isCorrect: false,
          label: "Total economic growth would necessarily become negative",
        },
        {
          isCorrect: true,
          label:
            "The household-consumption contribution would be below $$2.74$$ percentage points",
        },
        {
          isCorrect: false,
          label: "Household consumption would contribute nothing",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sumbangan konsumsi rumah tangga tetap tepat $$2{,}74$$ poin persentase",
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
          isCorrect: true,
          label:
            "Sumbangan konsumsi rumah tangga berada di bawah $$2{,}74$$ poin persentase",
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

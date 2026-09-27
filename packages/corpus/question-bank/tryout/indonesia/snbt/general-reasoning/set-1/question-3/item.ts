import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nilai FOLU lebih rendah daripada energi pada tahun dasar $$2010$$.",
        },
        {
          isCorrect: true,
          label:
            "Energi dan FOLU merupakan dua nilai terbesar pada kedua acuan, meskipun urutannya berubah.",
        },
        {
          isCorrect: false,
          label:
            "Sektor pertanian memiliki nilai tertinggi pada proyeksi $$2030$$.",
        },
        {
          isCorrect: false,
          label: "Sektor yang sama memiliki nilai tertinggi pada kedua acuan.",
        },
        {
          isCorrect: false,
          label:
            "Gabungan sektor limbah dan proses industri melampaui energi pada tahun dasar $$2010$$.",
        },
      ],
    },
  },
};

export default item;

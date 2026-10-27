import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Nilai FOLU lebih rendah daripada energi pada tahun dasar $$2010$$.",
        },
        {
          correct: true,
          label:
            "Energi dan FOLU merupakan dua nilai terbesar pada kedua acuan, meskipun urutannya berubah.",
        },
        {
          correct: false,
          label:
            "Sektor pertanian memiliki nilai tertinggi pada proyeksi $$2030$$.",
        },
        {
          correct: false,
          label: "Sektor yang sama memiliki nilai tertinggi pada kedua acuan.",
        },
        {
          correct: false,
          label:
            "Gabungan sektor limbah dan proses industri melampaui energi pada tahun dasar $$2010$$.",
        },
      ],
    },
  },
};

export default item;

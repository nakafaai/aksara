import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "FOLU lag im Basisjahr 2010 unter dem Energiesektor.",
        },
        {
          isCorrect: false,
          label:
            "Die Landwirtschaft hatte in der Projektion für 2030 den höchsten Wert.",
        },
        {
          isCorrect: false,
          label:
            "An beiden Bezugspunkten hatte derselbe Sektor den höchsten Wert.",
        },
        {
          isCorrect: false,
          label:
            "Abfall und Industrieprozesse übertrafen zusammen den Energiesektor im Basisjahr 2010.",
        },
        {
          isCorrect: true,
          label:
            "Energie und FOLU waren an beiden Bezugspunkten die zwei größten Werte, obwohl sich ihre Reihenfolge änderte.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "FOLU had a lower value than energy in the 2010 baseline.",
        },
        {
          isCorrect: false,
          label: "Agriculture had the highest value in the 2030 projection.",
        },
        {
          isCorrect: false,
          label:
            "The same sector had the highest value at both reference points.",
        },
        {
          isCorrect: false,
          label:
            "Waste and industrial processes together exceeded energy in the 2010 baseline.",
        },
        {
          isCorrect: true,
          label:
            "Energy and FOLU were the two largest values at both reference points, although their order changed.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nilai FOLU lebih rendah daripada energi pada tahun dasar 2010.",
        },
        {
          isCorrect: false,
          label:
            "Sektor pertanian memiliki nilai tertinggi pada proyeksi 2030.",
        },
        {
          isCorrect: false,
          label: "Sektor yang sama memiliki nilai tertinggi pada kedua acuan.",
        },
        {
          isCorrect: false,
          label:
            "Gabungan sektor limbah dan proses industri melampaui energi pada tahun dasar 2010.",
        },
        {
          isCorrect: true,
          label:
            "Energi dan FOLU merupakan dua nilai terbesar pada kedua acuan, meskipun urutannya berubah.",
        },
      ],
    },
  },
};

export default item;

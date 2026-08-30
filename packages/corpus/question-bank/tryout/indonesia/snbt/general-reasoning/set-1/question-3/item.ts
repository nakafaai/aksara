import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "FOLU lag im Basisjahr 2010 unter dem Energiesektor.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Landwirtschaft hatte in der Projektion für 2030 den höchsten Wert.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "An beiden Bezugspunkten hatte derselbe Sektor den höchsten Wert.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Energie und FOLU waren an beiden Bezugspunkten die zwei größten Werte, obwohl sich ihre Reihenfolge änderte.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Abfall und Industrieprozesse übertrafen zusammen den Energiesektor im Basisjahr 2010.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "FOLU had a lower value than energy in the 2010 baseline.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Agriculture had the highest value in the 2030 projection.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The same sector had the highest value at both reference points.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Energy and FOLU were the two largest values at both reference points, although their order changed.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Waste and industrial processes together exceeded energy in the 2010 baseline.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Nilai FOLU lebih rendah daripada energi pada tahun dasar 2010.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sektor pertanian memiliki nilai tertinggi pada proyeksi 2030.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sektor yang sama memiliki nilai tertinggi pada kedua acuan.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Energi dan FOLU merupakan dua nilai terbesar pada kedua acuan, meskipun urutannya berubah.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Gabungan sektor limbah dan proses industri melampaui energi pada tahun dasar 2010.",
            },
          ],
        },
      ],
    },
  },
};

export default item;

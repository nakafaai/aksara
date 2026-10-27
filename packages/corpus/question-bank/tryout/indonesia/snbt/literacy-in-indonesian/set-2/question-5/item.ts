import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Namun, sayangnya",
        },
        {
          correct: false,
          label: "Akhirnya, orang menganggap",
        },
        {
          correct: false,
          label: "Walaupun demikian, banyak orang yang beranggapan",
        },
        {
          correct: false,
          label: "Di balik semua itu, ada peran pemerintah secara agregat",
        },
        {
          correct: true,
          label: "Meskipun memiliki daya tarik universal",
        },
      ],
    },
  },
};

export default item;

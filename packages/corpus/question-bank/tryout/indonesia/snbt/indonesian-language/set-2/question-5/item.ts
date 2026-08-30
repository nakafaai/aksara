import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Namun, sayangnya" },
        { isCorrect: false, label: "Akhirnya, orang menganggap" },
        {
          isCorrect: false,
          label: "Walaupun demikian, banyak orang yang beranggapan",
        },
        { isCorrect: true, label: "Meskipun memiliki daya tarik universal" },
        {
          isCorrect: false,
          label: "Dibalik semua itu, ada peran pemerintah secara agregat",
        },
      ],
    },
  },
};

export default item;

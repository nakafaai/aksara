import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Namun, sayangnya" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Akhirnya, orang menganggap" }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Walaupun demikian, banyak orang yang beranggapan",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Meskipun memiliki daya tarik universal" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Dibalik semua itu, ada peran pemerintah secara agregat",
            },
          ],
        },
      ],
    },
  },
};

export default item;

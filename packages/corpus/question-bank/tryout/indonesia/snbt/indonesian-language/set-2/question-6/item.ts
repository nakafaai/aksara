import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Komik dan novel",
        },
        {
          isCorrect: false,
          label: "Cerita fiksi dan komik",
        },
        {
          isCorrect: false,
          label: "Dongeng dan penelitian",
        },
        {
          isCorrect: true,
          label: "Dongeng dan pengetahuan",
        },
        {
          isCorrect: false,
          label: "Cerita fiksi dan keagamaan",
        },
      ],
    },
  },
};

export default item;

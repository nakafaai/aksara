import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Ayam" },
        { isCorrect: false, label: "Sapi" },
        { isCorrect: true, label: "Domba" },
        { isCorrect: false, label: "Kelinci" },
        { isCorrect: false, label: "Bebek" },
      ],
    },
  },
};

export default item;

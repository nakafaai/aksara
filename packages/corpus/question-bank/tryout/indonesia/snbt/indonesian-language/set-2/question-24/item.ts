import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "Asia Selatan" },
        { isCorrect: false, label: "Mediterania timur" },
        { isCorrect: false, label: "Asia Tenggara" },
        { isCorrect: false, label: "Afrika Barat" },
        { isCorrect: false, label: "Eropa Utara" },
      ],
    },
  },
};

export default item;

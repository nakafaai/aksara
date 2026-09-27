import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "terawat." },
        { isCorrect: false, label: "terbangun." },
        { isCorrect: false, label: "terpelihara." },
        { isCorrect: false, label: "terlindungi." },
        { isCorrect: true, label: "terlelap." },
      ],
    },
  },
};

export default item;

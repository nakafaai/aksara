import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "equitable" },
        { isCorrect: false, label: "appropriate" },
        { isCorrect: false, label: "sustainable" },
        { isCorrect: false, label: "digital" },
        { isCorrect: false, label: "limited" },
      ],
    },
  },
};

export default item;

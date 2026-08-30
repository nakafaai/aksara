import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "expensive" },
        { isCorrect: false, label: "experimental" },
        { isCorrect: true, label: "not equal or consistent" },
        { isCorrect: false, label: "widely available" },
        { isCorrect: false, label: "carefully planned" },
      ],
    },
  },
};

export default item;

import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Increase" },
        { isCorrect: false, label: "Ignore" },
        { isCorrect: false, label: "Prevent" },
        { isCorrect: false, label: "Measure" },
        { isCorrect: true, label: "Relieve" },
      ],
    },
  },
};

export default item;

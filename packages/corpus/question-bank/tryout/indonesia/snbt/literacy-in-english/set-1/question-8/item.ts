import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "objective" },
        { isCorrect: false, label: "pessimistic" },
        { isCorrect: false, label: "assertive" },
        { isCorrect: false, label: "responsive" },
        { isCorrect: false, label: "reactive" },
      ],
    },
  },
};

export default item;

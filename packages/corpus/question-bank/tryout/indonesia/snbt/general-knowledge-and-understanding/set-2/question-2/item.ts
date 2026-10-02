import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "namun." },
        { isCorrect: true, label: "tetapi." },
        { isCorrect: false, label: "meskipun." },
        { isCorrect: false, label: "sedangkan." },
        { isCorrect: false, label: "melainkan." },
      ],
    },
  },
};

export default item;

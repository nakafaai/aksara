import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "memperparah." },
        { isCorrect: false, label: "menyebabkan." },
        { isCorrect: true, label: "mengurangi." },
        { isCorrect: false, label: "menumbuhkan." },
        { isCorrect: false, label: "menghilangkan." },
      ],
    },
  },
};

export default item;

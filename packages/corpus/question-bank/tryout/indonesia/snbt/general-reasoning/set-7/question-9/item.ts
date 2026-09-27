import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Senin" },
        { isCorrect: false, label: "Rabu" },
        { isCorrect: false, label: "Kamis" },
        { isCorrect: true, label: "Selasa" },
        { isCorrect: false, label: "Jumat" },
      ],
    },
  },
};

export default item;

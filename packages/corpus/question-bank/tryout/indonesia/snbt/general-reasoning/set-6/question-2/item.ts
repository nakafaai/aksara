import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Oktober" },
        { isCorrect: false, label: "November" },
        { isCorrect: true, label: "Desember" },
        { isCorrect: false, label: "Januari" },
        { isCorrect: false, label: "Februari" },
      ],
    },
  },
};

export default item;

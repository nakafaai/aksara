import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Program" },
        { isCorrect: false, label: "Lembaga" },
        { isCorrect: false, label: "Negara" },
        { isCorrect: false, label: "Bangsa" },
        { isCorrect: true, label: "Serikat" },
      ],
    },
  },
};

export default item;

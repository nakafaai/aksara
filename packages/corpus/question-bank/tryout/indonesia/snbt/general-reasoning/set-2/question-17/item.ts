import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Sains" },
        { isCorrect: false, label: "Agama" },
        { isCorrect: false, label: "Sastra" },
        { isCorrect: true, label: "Kamus" },
        { isCorrect: false, label: "Sejarah" },
      ],
    },
  },
};

export default item;

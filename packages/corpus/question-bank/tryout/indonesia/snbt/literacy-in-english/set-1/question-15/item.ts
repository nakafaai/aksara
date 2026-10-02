import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Nostalgic" },
        { isCorrect: false, label: "Humorous" },
        { isCorrect: true, label: "Informative" },
        { isCorrect: false, label: "Hostile" },
        { isCorrect: false, label: "Doubtful" },
      ],
    },
  },
};

export default item;

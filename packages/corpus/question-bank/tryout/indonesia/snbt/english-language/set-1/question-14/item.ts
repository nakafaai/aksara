import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "Necessity" },
        { isCorrect: false, label: "Prohibition" },
        { isCorrect: false, label: "Possibility" },
        { isCorrect: false, label: "Permission" },
        { isCorrect: false, label: "Uncertainty" },
      ],
    },
  },
};

export default item;

import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "Yogyakarta" },
        { isCorrect: false, label: "Lombok" },
        { isCorrect: false, label: "Manado" },
        { isCorrect: false, label: "Padang" },
        { isCorrect: false, label: "Bali" },
      ],
    },
  },
};

export default item;

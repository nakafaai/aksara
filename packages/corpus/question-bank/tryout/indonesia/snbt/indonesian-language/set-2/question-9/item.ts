import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "Laba-Laba Sakti" },
        { isCorrect: false, label: "Malin Kundang" },
        { isCorrect: false, label: "Sangkuriang" },
        { isCorrect: false, label: "Timun Mas" },
        { isCorrect: false, label: "Roro Jonggrang" },
      ],
    },
  },
};

export default item;

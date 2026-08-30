import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "Malin Kundang" }] },
        { isCorrect: true, label: [{ kind: "text", text: "Laba-Laba Sakti" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Sangkuriang" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Timun Mas" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Roro Jonggrang" }] },
      ],
    },
  },
};

export default item;

import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: [{ kind: "text", text: "Serikat" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Program" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Lembaga" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Negara" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Bangsa" }] },
      ],
    },
  },
};

export default item;

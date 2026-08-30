import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: [{ kind: "text", text: "equitable" }] },
        { isCorrect: false, label: [{ kind: "text", text: "appropriate" }] },
        { isCorrect: false, label: [{ kind: "text", text: "sustainable" }] },
        { isCorrect: false, label: [{ kind: "text", text: "digital" }] },
        { isCorrect: false, label: [{ kind: "text", text: "limited" }] },
      ],
    },
  },
};

export default item;

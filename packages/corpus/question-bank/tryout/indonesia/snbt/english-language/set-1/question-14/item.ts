import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "Prohibition" }] },
        { isCorrect: true, label: [{ kind: "text", text: "Necessity" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Possibility" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Permission" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Uncertainty" }] },
      ],
    },
  },
};

export default item;

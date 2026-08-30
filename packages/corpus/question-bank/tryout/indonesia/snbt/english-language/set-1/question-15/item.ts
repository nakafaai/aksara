import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: [{ kind: "text", text: "Informative" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Nostalgic" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Humorous" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Hostile" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Doubtful" }] },
      ],
    },
  },
};

export default item;

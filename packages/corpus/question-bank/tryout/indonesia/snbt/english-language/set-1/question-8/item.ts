import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "pessimistic" }] },
        { isCorrect: false, label: [{ kind: "text", text: "assertive" }] },
        { isCorrect: true, label: [{ kind: "text", text: "objective" }] },
        { isCorrect: false, label: [{ kind: "text", text: "responsive" }] },
        { isCorrect: false, label: [{ kind: "text", text: "reactive" }] },
      ],
    },
  },
};

export default item;

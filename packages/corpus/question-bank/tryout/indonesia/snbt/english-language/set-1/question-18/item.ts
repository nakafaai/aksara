import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "Increase" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Ignore" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Prevent" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Measure" }] },
        { isCorrect: true, label: [{ kind: "text", text: "Relieve" }] },
      ],
    },
  },
};

export default item;

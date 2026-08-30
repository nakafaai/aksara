import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "Dismissive" }] },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Unconditionally enthusiastic" }],
        },
        { isCorrect: false, label: [{ kind: "text", text: "Alarmist" }] },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Balanced and cautious" }],
        },
        { isCorrect: false, label: [{ kind: "text", text: "Indifferent" }] },
      ],
    },
  },
};

export default item;

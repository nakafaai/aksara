import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Dismissive" },
        {
          isCorrect: false,
          label: "Unconditionally enthusiastic",
        },
        { isCorrect: false, label: "Alarmist" },
        {
          isCorrect: true,
          label: "Balanced and cautious",
        },
        { isCorrect: false, label: "Indifferent" },
      ],
    },
  },
};

export default item;

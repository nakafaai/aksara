import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Dismissive of all nutritional advice",
        },
        {
          isCorrect: false,
          label: "Certain that one food can prevent every infection",
        },
        {
          isCorrect: true,
          label: "Practical and evidence-based",
        },
        {
          isCorrect: false,
          label: "Alarmist about eating any sugar",
        },
        {
          isCorrect: false,
          label: "Indifferent to dietary habits",
        },
      ],
    },
  },
};

export default item;

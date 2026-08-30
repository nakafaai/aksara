import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "A complete failure" },
        { isCorrect: false, label: "A legal requirement" },
        { isCorrect: false, label: "A historical sequence" },
        { isCorrect: false, label: "A guaranteed advantage" },
        {
          isCorrect: true,
          label: "A compromise between competing benefits and costs",
        },
      ],
    },
  },
};

export default item;

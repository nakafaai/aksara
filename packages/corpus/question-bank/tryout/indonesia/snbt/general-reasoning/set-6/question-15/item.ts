import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "sus" },
        { isCorrect: false, label: "biskuit" },
        { isCorrect: false, label: "molen" },
        { isCorrect: false, label: "pia" },
        { isCorrect: false, label: "tart" },
      ],
    },
  },
};

export default item;

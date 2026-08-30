import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$(7)$$" },
        { isCorrect: false, label: "$$(12)$$" },
        { isCorrect: false, label: "$$(29)$$" },
        { isCorrect: false, label: "$$(32)$$" },
        { isCorrect: true, label: "$$(2)$$" },
      ],
    },
  },
};

export default item;

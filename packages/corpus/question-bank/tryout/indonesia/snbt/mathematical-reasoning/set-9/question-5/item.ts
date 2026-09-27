import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$208$$",
        },
        {
          isCorrect: false,
          label: "$$224$$",
        },
        {
          isCorrect: false,
          label: "$$232$$",
        },
        {
          isCorrect: false,
          label: "$$248$$",
        },
        {
          isCorrect: true,
          label: "$$240$$",
        },
      ],
    },
  },
};

export default item;

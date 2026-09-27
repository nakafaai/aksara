import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "dataran tinggi.",
        },
        {
          isCorrect: false,
          label: "fenomena embun.",
        },
        {
          isCorrect: false,
          label: "hamparan rumput.",
        },
        {
          isCorrect: false,
          label: "embun es.",
        },
        {
          isCorrect: false,
          label: "masih berada.",
        },
      ],
    },
  },
};

export default item;

import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "To prove that private offices are perfect for every task",
        },
        {
          isCorrect: true,
          label:
            "To challenge a one-size-fits-all assumption and support context-based decisions",
        },
        {
          isCorrect: false,
          label: "To advertise wearable sensors to office managers",
        },
        {
          isCorrect: false,
          label: "To show that electronic communication should be banned",
        },
        {
          isCorrect: false,
          label: "To argue that workplace evidence is unnecessary",
        },
      ],
    },
  },
};

export default item;

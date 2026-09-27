import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-23
const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "BBS",
        },
        {
          isCorrect: true,
          label: "BSB",
        },
        {
          isCorrect: false,
          label: "BSS",
        },
        {
          isCorrect: false,
          label: "SBB",
        },
        {
          isCorrect: false,
          label: "SBS",
        },
      ],
    },
  },
};

export default item;

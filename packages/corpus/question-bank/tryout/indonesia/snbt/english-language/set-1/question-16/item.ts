import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "To prove that yoga cures every chronic illness.",
        },
        {
          isCorrect: false,
          label: "To persuade readers to replace medical care with yoga.",
        },
        {
          isCorrect: false,
          label:
            "To compare the religious traditions behind different yoga styles.",
        },
        {
          isCorrect: true,
          label:
            "To explain yoga's possible physical and mental benefits, evidence limits, and safe practice.",
        },
        {
          isCorrect: false,
          label: "To teach a complete sequence of advanced yoga poses.",
        },
      ],
    },
  },
};

export default item;

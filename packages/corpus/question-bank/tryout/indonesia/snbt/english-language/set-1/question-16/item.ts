import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "To prove that yoga cures every chronic illness.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "To persuade readers to replace medical care with yoga.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "To explain yoga's possible physical and mental benefits, evidence limits, and safe practice.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "To compare the religious traditions behind different yoga styles.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "To teach a complete sequence of advanced yoga poses.",
            },
          ],
        },
      ],
    },
  },
};

export default item;

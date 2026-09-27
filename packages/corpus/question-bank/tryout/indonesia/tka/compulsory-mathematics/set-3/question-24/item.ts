import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "probability",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac37$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac12$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{15}{28}$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac{13}{28}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac47$$",
        },
      ],
    },
  },
};

export default item;

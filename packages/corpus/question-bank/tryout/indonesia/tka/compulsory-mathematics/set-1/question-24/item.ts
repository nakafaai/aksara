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
          label: "$$\\frac5{18}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac13$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac7{18}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac49$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac12$$",
        },
      ],
    },
  },
};

export default item;

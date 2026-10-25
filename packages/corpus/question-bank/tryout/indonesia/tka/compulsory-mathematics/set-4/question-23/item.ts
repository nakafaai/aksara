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
          isCorrect: true,
          label: "$$\\frac{6}{55}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{6}{25}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{3}{10}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{4}{11}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{5}{11}$$",
        },
      ],
    },
  },
  stimulusKey: "club-choices",
};

export default item;

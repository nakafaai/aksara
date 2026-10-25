import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "functions",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac{13}{20}\\text{ m/s}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{19}{20}\\text{ m/s}$$",
        },
        {
          isCorrect: false,
          label: "$$1\\text{ m/s}$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac{5}{4}\\text{ m/s}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{5}{3}\\text{ m/s}$$",
        },
      ],
    },
  },
  stimulusKey: "freight-lift",
};

export default item;

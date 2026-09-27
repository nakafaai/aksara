import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "functions",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$-\\frac35$$",
        },
        {
          isCorrect: true,
          label: "$$2$$",
        },
        {
          isCorrect: false,
          label: "$$0$$",
        },
        {
          isCorrect: false,
          label: "$$1$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac52$$",
        },
      ],
    },
  },
};

export default item;

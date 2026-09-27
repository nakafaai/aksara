import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$35{,}40$$",
        },
        {
          isCorrect: false,
          label: "$$38{,}40$$",
        },
        {
          isCorrect: false,
          label: "$$39{,}60$$",
        },
        {
          isCorrect: false,
          label: "$$42{,}24$$",
        },
        {
          isCorrect: true,
          label: "$$38{,}94$$",
        },
      ],
    },
  },
};

export default item;

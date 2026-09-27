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
          label: "$$1$$",
        },
        {
          isCorrect: true,
          label: "$$4$$",
        },
        {
          isCorrect: false,
          label: "$$2$$",
        },
        {
          isCorrect: false,
          label: "$$3$$",
        },
        {
          isCorrect: false,
          label: "$$5$$",
        },
      ],
    },
  },
};

export default item;

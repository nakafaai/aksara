import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$-8$$",
        },
        {
          isCorrect: false,
          label: "$$-6$$",
        },
        {
          isCorrect: false,
          label: "$$-2$$",
        },
        {
          isCorrect: false,
          label: "$$4$$",
        },
        {
          isCorrect: true,
          label: "$$-4$$",
        },
      ],
    },
  },
};

export default item;

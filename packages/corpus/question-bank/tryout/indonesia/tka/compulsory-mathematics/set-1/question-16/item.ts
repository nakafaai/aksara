import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$4\\pi+9$$",
        },
        {
          isCorrect: false,
          label: "$$80-4\\pi$$",
        },
        {
          isCorrect: false,
          label: "$$71+4\\pi$$",
        },
        {
          isCorrect: true,
          label: "$$71-4\\pi$$",
        },
        {
          isCorrect: false,
          label: "$$80-9\\pi$$",
        },
      ],
    },
  },
};

export default item;

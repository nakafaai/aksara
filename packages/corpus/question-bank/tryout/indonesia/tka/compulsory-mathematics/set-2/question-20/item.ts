import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "trigonometry",
    topic: "trigonometric-ratios",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$4\\sqrt3$$",
        },
        {
          isCorrect: false,
          label: "$$5$$",
        },
        {
          isCorrect: true,
          label: "$$5\\sqrt3$$",
        },
        {
          isCorrect: false,
          label: "$$2\\sqrt{21}$$",
        },
        {
          isCorrect: false,
          label: "$$10$$",
        },
      ],
    },
  },
};

export default item;

import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$5\\text{ m}$$",
        },
        {
          isCorrect: true,
          label: "$$\\sqrt{41}\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$\\sqrt{73}\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$\\left(3+4\\sqrt{2}\\right)\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$\\sqrt{137}\\text{ m}$$",
        },
      ],
    },
  },
  stimulusKey: "pavilion-roof",
};

export default item;

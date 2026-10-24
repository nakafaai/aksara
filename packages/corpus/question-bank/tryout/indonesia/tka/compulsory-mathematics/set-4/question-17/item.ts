import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$3\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$4\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{24}{5}\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$5\\text{ m}$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac{12}{5}\\text{ m}$$",
        },
      ],
    },
  },
  stimulusKey: "pavilion-roof",
};

export default item;

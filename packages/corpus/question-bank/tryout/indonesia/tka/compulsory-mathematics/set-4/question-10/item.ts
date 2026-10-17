import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$6\\text{ cm}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{13}{2}\\text{ cm}$$",
        },
        {
          isCorrect: false,
          label: "$$2\\sqrt{13}\\text{ cm}$$",
        },
        {
          isCorrect: false,
          label: "$$6\\sqrt{2}\\text{ cm}$$",
        },
        {
          isCorrect: false,
          label: "$$3\\sqrt{13}\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;

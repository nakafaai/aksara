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
          label: "$$14\\text{ cm}$$",
        },
        {
          isCorrect: false,
          label: "$$22\\text{ cm}$$",
        },
        {
          isCorrect: false,
          label: "$$26{,}4\\text{ cm}$$",
        },
        {
          isCorrect: false,
          label: "$$42\\text{ cm}$$",
        },
        {
          isCorrect: true,
          label: "$$44\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;

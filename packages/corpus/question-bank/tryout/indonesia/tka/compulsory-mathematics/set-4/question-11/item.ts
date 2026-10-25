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
          label: "$$1{,}2\\text{ km}$$",
        },
        {
          isCorrect: true,
          label: "$$6\\text{ km}$$",
        },
        {
          isCorrect: false,
          label: "$$\\sqrt{45}\\text{ km}$$",
        },
        {
          isCorrect: false,
          label: "$$7{,}5\\text{ km}$$",
        },
        {
          isCorrect: false,
          label: "$$\\sqrt{85}\\text{ km}$$",
        },
      ],
    },
  },
};

export default item;

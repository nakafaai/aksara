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
          label: "$$3{,}6\\text{ km}$$",
        },
        {
          isCorrect: true,
          label: "$$7{,}2\\text{ km}$$",
        },
        {
          isCorrect: false,
          label: "$$7{,}5\\text{ km}$$",
        },
        {
          isCorrect: false,
          label: "$$9\\text{ km}$$",
        },
        {
          isCorrect: false,
          label: "$$12\\text{ km}$$",
        },
      ],
    },
  },
};

export default item;

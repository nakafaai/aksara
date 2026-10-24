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
          label: "$$6\\text{ m}$$",
        },
        {
          isCorrect: true,
          label: "$$9{,}6\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$8\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$10\\text{ m}$$",
        },
        {
          isCorrect: false,
          label: "$$12\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;

import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$3$$",
        },
        {
          isCorrect: false,
          label: "$$6$$",
        },
        {
          isCorrect: true,
          label: "$$10$$",
        },
        {
          isCorrect: false,
          label: "$$11$$",
        },
        {
          isCorrect: false,
          label: "$$13$$",
        },
      ],
    },
  },
};

export default item;

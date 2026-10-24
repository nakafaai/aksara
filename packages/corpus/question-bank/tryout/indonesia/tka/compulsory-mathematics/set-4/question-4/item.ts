import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$x\\ge0,\\ 2x+y\\le8,\\ 2y-3x\\ge2$$",
        },
        {
          isCorrect: false,
          label: "$$x\\ge0,\\ 2x+y\\ge8,\\ 2y-3x\\ge2$$",
        },
        {
          isCorrect: false,
          label: "$$x\\ge0,\\ 2x+y\\le8,\\ 2y-3x\\le2$$",
        },
        {
          isCorrect: false,
          label: "$$x\\le0,\\ 2x+y\\le8,\\ 2y-3x\\ge2$$",
        },
        {
          isCorrect: false,
          label: "$$x\\ge0,\\ 2x+y\\le8,\\ 3x-2y\\ge2$$",
        },
      ],
    },
  },
};

export default item;

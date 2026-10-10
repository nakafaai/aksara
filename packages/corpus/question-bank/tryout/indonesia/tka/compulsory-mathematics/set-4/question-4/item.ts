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
          label: "$$x+y\\le6,\\ x+3y\\ge9,\\ x\\ge0,\\ y\\ge0$$",
        },
        {
          isCorrect: false,
          label: "$$x+y\\le6,\\ x+3y\\le9,\\ x\\ge0,\\ y\\ge0$$",
        },
        {
          isCorrect: false,
          label: "$$x+y\\le6,\\ 3x+y\\ge9,\\ x\\ge0,\\ y\\ge0$$",
        },
        {
          isCorrect: false,
          label: "$$x+y\\ge6,\\ x+3y\\ge9,\\ x\\ge0,\\ y\\ge0$$",
        },
        {
          isCorrect: false,
          label: "$$x+y\\ge6,\\ x+3y\\le9,\\ x\\ge0,\\ y\\ge0$$",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$x\\ge0,\\ 2x+y\\le8,\\ 2y-3x\\ge2$$",
        },
        {
          correct: false,
          label: "$$x\\ge0,\\ 2x+y\\ge8,\\ 2y-3x\\ge2$$",
        },
        {
          correct: false,
          label: "$$x\\ge0,\\ 2x+y\\le8,\\ 2y-3x\\le2$$",
        },
        {
          correct: false,
          label: "$$x\\le0,\\ 2x+y\\le8,\\ 2y-3x\\ge2$$",
        },
        {
          correct: false,
          label: "$$x\\ge0,\\ 2x+y\\le8,\\ 3x-2y\\ge2$$",
        },
      ],
    },
  },
};

export default item;

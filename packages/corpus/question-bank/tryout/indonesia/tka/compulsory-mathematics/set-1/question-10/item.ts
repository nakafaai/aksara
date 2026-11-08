import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$162^\\circ$$",
        },
        {
          correct: false,
          label: "$$160^\\circ$$",
        },
        {
          correct: false,
          label: "$$20^\\circ$$",
        },
        {
          correct: true,
          label: "$$18^\\circ$$",
        },
        {
          correct: false,
          label: "$$198^\\circ$$",
        },
      ],
    },
  },
};

export default item;

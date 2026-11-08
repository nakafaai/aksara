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
          label: "$$0^\\circ$$",
        },
        {
          correct: true,
          label: "$$10^\\circ$$",
        },
        {
          correct: false,
          label: "$$20^\\circ$$",
        },
        {
          correct: false,
          label: "$$30^\\circ$$",
        },
        {
          correct: false,
          label: "$$110^\\circ$$",
        },
      ],
    },
  },
};

export default item;

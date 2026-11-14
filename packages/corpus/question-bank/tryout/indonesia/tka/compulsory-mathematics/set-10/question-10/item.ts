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
          label: "$$58^\\circ$$",
        },
        {
          correct: false,
          label: "$$116^\\circ$$",
        },
        {
          correct: true,
          label: "$$122^\\circ$$",
        },
        {
          correct: false,
          label: "$$128^\\circ$$",
        },
        {
          correct: false,
          label: "$$148^\\circ$$",
        },
      ],
    },
  },
};

export default item;

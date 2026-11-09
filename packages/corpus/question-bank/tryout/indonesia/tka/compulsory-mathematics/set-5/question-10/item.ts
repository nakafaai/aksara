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
          label: "$$24^\\circ$$",
        },
        {
          correct: false,
          label: "$$55^\\circ$$",
        },
        {
          correct: false,
          label: "$$58^\\circ$$",
        },
        {
          correct: true,
          label: "$$67^\\circ$$",
        },
        {
          correct: false,
          label: "$$125^\\circ$$",
        },
      ],
    },
  },
};

export default item;

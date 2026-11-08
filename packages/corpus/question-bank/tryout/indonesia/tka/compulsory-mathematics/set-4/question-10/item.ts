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
          label: "$$30^\\circ$$",
        },
        {
          correct: false,
          label: "$$135^\\circ$$",
        },
        {
          correct: true,
          label: "$$150^\\circ$$",
        },
        {
          correct: false,
          label: "$$165^\\circ$$",
        },
        {
          correct: false,
          label: "$$1{.}800^\\circ$$",
        },
      ],
    },
  },
};

export default item;

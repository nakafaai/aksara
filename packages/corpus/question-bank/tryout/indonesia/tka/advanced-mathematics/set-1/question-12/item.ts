import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "vectors",
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
          correct: true,
          label: "$$60^\\circ$$",
        },
        {
          correct: false,
          label: "$$90^\\circ$$",
        },
        {
          correct: false,
          label: "$$120^\\circ$$",
        },
        {
          correct: false,
          label: "$$150^\\circ$$",
        },
      ],
    },
  },
};

export default item;

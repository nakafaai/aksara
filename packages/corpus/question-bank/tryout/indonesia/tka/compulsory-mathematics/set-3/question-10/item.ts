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
          label: "$$28^\\circ$$",
        },
        {
          correct: true,
          label: "$$62^\\circ$$",
        },
        {
          correct: false,
          label: "$$118^\\circ$$",
        },
        {
          correct: false,
          label: "$$124^\\circ$$",
        },
        {
          correct: false,
          label: "$$248^\\circ$$",
        },
      ],
    },
  },
};

export default item;

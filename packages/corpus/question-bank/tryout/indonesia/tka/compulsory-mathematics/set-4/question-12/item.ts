import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$y=x^2$$",
        },
        {
          correct: false,
          label: "$$y=x^2-6$$",
        },
        {
          correct: false,
          label: "$$y=x^2+8$$",
        },
        {
          correct: false,
          label: "$$y=x^2-8x+10$$",
        },
        {
          correct: false,
          label: "$$y=x^2-8x+16$$",
        },
      ],
    },
  },
};

export default item;

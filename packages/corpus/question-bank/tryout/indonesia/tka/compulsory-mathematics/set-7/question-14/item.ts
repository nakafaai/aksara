import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$y=-3x+5$$",
        },
        {
          correct: false,
          label: "$$y=-3x+1$$",
        },
        {
          correct: false,
          label: "$$y=-3x+3$$",
        },
        {
          correct: false,
          label: "$$y=3x+3$$",
        },
        {
          correct: false,
          label: "$$y=-3x+11$$",
        },
      ],
    },
  },
};

export default item;

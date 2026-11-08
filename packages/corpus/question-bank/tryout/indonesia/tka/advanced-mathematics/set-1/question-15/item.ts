import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "circles",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$y=2x+3$$",
        },
        {
          correct: false,
          label: "$$y=2x-4+\\sqrt5$$",
        },
        {
          correct: false,
          label: "$$y=-\\frac12x+1$$",
        },
        {
          correct: false,
          label: "$$y=2x+9$$",
        },
        {
          correct: true,
          label: "$$y=2x+1$$",
        },
      ],
    },
  },
};

export default item;

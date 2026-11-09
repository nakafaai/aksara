import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\angle A=60^\\circ$$",
        },
        {
          correct: true,
          label: "$$\\angle D=95^\\circ$$",
        },
        {
          correct: false,
          label: "$$AC$$ adalah diameter lingkaran itu.",
        },
        {
          correct: false,
          label: "$$\\angle B=\\angle D$$",
        },
        {
          correct: false,
          label: "$$\\angle A+\\angle B=180^\\circ$$",
        },
      ],
    },
  },
};

export default item;

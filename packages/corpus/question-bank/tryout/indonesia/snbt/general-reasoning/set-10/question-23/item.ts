import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac3{11}$$",
        },
        {
          correct: false,
          label: "$$\\frac13$$",
        },
        {
          correct: false,
          label: "$$\\frac4{11}$$",
        },
        {
          correct: true,
          label: "$$\\frac7{22}$$",
        },
        {
          correct: false,
          label: "$$\\frac5{11}$$",
        },
      ],
    },
  },
};

export default item;

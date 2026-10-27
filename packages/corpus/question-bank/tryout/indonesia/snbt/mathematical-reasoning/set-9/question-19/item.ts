import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\sqrt{86}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{106}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{116}$$",
        },
        {
          correct: true,
          label: "$$10$$",
        },
        {
          correct: false,
          label: "$$12$$",
        },
      ],
    },
  },
};

export default item;

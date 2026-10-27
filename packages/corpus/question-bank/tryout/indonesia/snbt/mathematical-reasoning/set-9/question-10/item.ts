import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$4$$",
        },
        {
          correct: false,
          label: "$$3$$",
        },
        {
          correct: false,
          label: "$$\\frac72$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{17}$$",
        },
        {
          correct: false,
          label: "$$5$$",
        },
      ],
    },
  },
};

export default item;

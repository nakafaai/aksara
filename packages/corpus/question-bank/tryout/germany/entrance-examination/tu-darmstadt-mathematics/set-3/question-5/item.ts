import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$m=-4$$",
        },
        {
          correct: true,
          label: "$$m=-\\frac32$$",
        },
        {
          correct: false,
          label: "$$m=-\\frac23$$",
        },
        {
          correct: false,
          label: "$$m=\\frac23$$",
        },
        {
          correct: false,
          label: "$$m=\\frac32$$",
        },
        {
          correct: false,
          label: "$$m=4$$",
        },
      ],
    },
  },
};

export default item;

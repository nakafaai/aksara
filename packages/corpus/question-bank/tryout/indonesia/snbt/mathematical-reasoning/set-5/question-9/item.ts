import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10$$",
        },
        {
          correct: false,
          label: "$$30$$",
        },
        {
          correct: false,
          label: "$$35$$",
        },
        {
          correct: true,
          label: "$$25$$",
        },
        {
          correct: false,
          label: "$$50$$",
        },
      ],
    },
  },
};

export default item;

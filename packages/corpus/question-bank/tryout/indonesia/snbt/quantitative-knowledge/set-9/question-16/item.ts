import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{1170}{37}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1177}{111}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1170}{999}$$",
        },
        {
          correct: true,
          label: "$$\\frac{3510}{1111}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1177}{999}$$",
        },
      ],
    },
  },
};

export default item;

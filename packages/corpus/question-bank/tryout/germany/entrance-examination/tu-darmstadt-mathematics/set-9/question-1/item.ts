import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$x^4+1$$",
        },
        {
          correct: false,
          label: "$$x^4-2x^2+1$$",
        },
        {
          correct: true,
          label: "$$x^4-1$$",
        },
        {
          correct: false,
          label: "$$x^3-1$$",
        },
        {
          correct: false,
          label: "$$x^4-x^2-1$$",
        },
        {
          correct: false,
          label: "$$x^4+2x^2+1$$",
        },
      ],
    },
  },
};

export default item;

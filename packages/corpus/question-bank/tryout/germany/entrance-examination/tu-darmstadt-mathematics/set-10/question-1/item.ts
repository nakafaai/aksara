import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$x^{\\frac34}$$",
        },
        {
          correct: true,
          label: "$$x^{2}$$",
        },
        {
          correct: false,
          label: "$$x^{\\frac52}$$",
        },
        {
          correct: false,
          label: "$$x^{\\frac74}$$",
        },
        {
          correct: false,
          label: "$$x^{6}$$",
        },
        {
          correct: false,
          label: "$$x$$",
        },
      ],
    },
  },
};

export default item;

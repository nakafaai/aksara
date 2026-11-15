import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$x^{\\frac{11}{6}}$$",
        },
        {
          correct: false,
          label: "$$x^{\\frac56}$$",
        },
        {
          correct: true,
          label: "$$x^{\\frac{11}{12}}$$",
        },
        {
          correct: false,
          label: "$$x^{\\frac34}$$",
        },
        {
          correct: false,
          label: "$$x^{\\frac{7}{12}}$$",
        },
        {
          correct: false,
          label: "$$x^{\\frac{13}{12}}$$",
        },
      ],
    },
  },
};

export default item;

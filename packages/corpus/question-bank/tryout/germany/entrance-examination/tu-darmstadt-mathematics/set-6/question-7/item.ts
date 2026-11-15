import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\mathbb{L}=\\left\\{\\frac12;\\,4\\right\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\{2\\}$$",
        },
        {
          correct: true,
          label: "$$\\mathbb{L}=\\{-1;\\,2\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\{1;\\,2\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\{2-\\log_2 7\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\left\\{\\log_2\\frac{9-\\sqrt{65}}{2};\\,\\log_2\\frac{9+\\sqrt{65}}{2}\\right\\}$$",
        },
      ],
    },
  },
};

export default item;

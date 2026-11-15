import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\mathbb{L}=\\{-2;\\,6\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\{-2\\}$$",
        },
        {
          correct: true,
          label: "$$\\mathbb{L}=\\{6\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\{\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\left\\{\\frac{1+\\sqrt{29}}{2}\\right\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\{1+\\sqrt7\\}$$",
        },
      ],
    },
  },
};

export default item;

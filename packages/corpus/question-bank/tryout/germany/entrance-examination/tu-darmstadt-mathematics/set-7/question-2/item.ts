import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\mathbb{L}=\\{-1;\\,1;\\,3\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\{-1;\\,3\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\{1\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\{-3;\\,-1;\\,1\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\{1-\\sqrt2;\\,1+\\sqrt2\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\{1;\\,3\\}$$",
        },
      ],
    },
  },
};

export default item;

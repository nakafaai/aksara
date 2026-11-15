import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\mathbb{L}=\\{1;\\,5\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\{5\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\{1\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\{1;\\,3\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\{3+2\\sqrt3\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\{\\}$$",
        },
      ],
    },
  },
};

export default item;

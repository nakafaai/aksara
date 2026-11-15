import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\mathbb{L}=\\{1;\\,6\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\{6\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\{1\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\{-1;\\,6\\}$$",
        },
        {
          correct: false,
          label: "$$\\mathbb{L}=\\{-6;\\,-1\\}$$",
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

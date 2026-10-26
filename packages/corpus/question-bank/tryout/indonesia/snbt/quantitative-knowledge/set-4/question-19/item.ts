import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2{,}5\\,\\mathrm{L}$$",
        },
        {
          correct: false,
          label: "$$5\\,\\mathrm{L}$$",
        },
        {
          correct: false,
          label: "$$7{,}5\\,\\mathrm{L}$$",
        },
        {
          correct: true,
          label: "$$12{,}5\\,\\mathrm{L}$$",
        },
        {
          correct: false,
          label: "$$10\\,\\mathrm{L}$$",
        },
      ],
    },
  },
};

export default item;

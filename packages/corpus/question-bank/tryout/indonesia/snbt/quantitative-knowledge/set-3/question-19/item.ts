import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2\\,\\mathrm{cm}$$",
        },
        {
          correct: true,
          label: "$$1{,}5\\,\\mathrm{cm}$$",
        },
        {
          correct: false,
          label: "$$2{,}5\\,\\mathrm{cm}$$",
        },
        {
          correct: false,
          label: "$$3\\,\\mathrm{cm}$$",
        },
        {
          correct: false,
          label: "$$3{,}5\\,\\mathrm{cm}$$",
        },
      ],
    },
  },
};

export default item;

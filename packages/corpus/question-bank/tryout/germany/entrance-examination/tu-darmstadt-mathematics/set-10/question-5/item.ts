import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$2{.}000\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$312{,}5\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$8\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$200\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$31{,}25\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;

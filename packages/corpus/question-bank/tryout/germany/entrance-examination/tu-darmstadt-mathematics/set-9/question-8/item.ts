import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$10^{9}<2^{30}<3^{20}$$",
        },
        {
          correct: false,
          label: "$$2^{30}<10^{9}<3^{20}$$",
        },
        {
          correct: false,
          label: "$$2^{30}<3^{20}<10^{9}$$",
        },
        {
          correct: false,
          label: "$$3^{20}<10^{9}<2^{30}$$",
        },
        {
          correct: false,
          label: "$$10^{9}<3^{20}<2^{30}$$",
        },
        {
          correct: false,
          label: "$$3^{20}<2^{30}<10^{9}$$",
        },
      ],
    },
  },
};

export default item;

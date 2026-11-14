import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10{.}000\\text{ €}$$",
        },
        {
          correct: false,
          label: "$$100\\text{ €}$$",
        },
        {
          correct: false,
          label: "$$100{.}000\\text{ €}$$",
        },
        {
          correct: true,
          label: "$$1{.}000\\text{ €}$$",
        },
        {
          correct: false,
          label: "$$1{.}000{.}000\\text{ €}$$",
        },
        {
          correct: false,
          label: "$$10\\text{ €}$$",
        },
      ],
    },
  },
};

export default item;

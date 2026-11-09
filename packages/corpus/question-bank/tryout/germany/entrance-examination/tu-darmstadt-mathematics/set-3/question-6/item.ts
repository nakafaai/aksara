import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$60{,}00\\text{ €}$$",
        },
        {
          correct: false,
          label: "$$121{,}80\\text{ €}$$",
        },
        {
          correct: false,
          label: "$$2{.}060{,}00\\text{ €}$$",
        },
        {
          correct: false,
          label: "$$2{.}120{,}00\\text{ €}$$",
        },
        {
          correct: true,
          label: "$$2{.}121{,}80\\text{ €}$$",
        },
        {
          correct: false,
          label: "$$2{.}180{,}00\\text{ €}$$",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$600\\text{ m}^2$$",
        },
        {
          correct: true,
          label: "$$6{.}000\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$6{.}050\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$6{.}550\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$12{.}000\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$12{.}100\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;

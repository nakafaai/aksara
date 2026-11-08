import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5{,}4\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$108\\text{ m}^2$$",
        },
        {
          correct: true,
          label: "$$10{.}800\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$54{.}000\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$1{.}080{.}000\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;

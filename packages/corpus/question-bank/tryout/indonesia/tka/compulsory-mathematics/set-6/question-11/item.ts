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
          label: "$$260\\text{ m}^2$$",
        },
        {
          correct: true,
          label: "$$1{.}300\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$1{.}550\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$2{.}000\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$2{.}600\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;

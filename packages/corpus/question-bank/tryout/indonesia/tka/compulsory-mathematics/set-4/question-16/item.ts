import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "milk-cans",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$110\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$220\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$385\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$770\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$1{.}540\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;

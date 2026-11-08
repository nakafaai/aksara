import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "trigonometry",
    topic: "trigonometric-ratios",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$65\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$600\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$624\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$650\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$1{.}440\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;

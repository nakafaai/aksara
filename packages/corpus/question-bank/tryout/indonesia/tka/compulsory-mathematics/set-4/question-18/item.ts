import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$397\\pi\\text{ gram}$$",
        },
        {
          correct: true,
          label: "$$728\\pi\\text{ gram}$$",
        },
        {
          correct: false,
          label: "$$864\\pi\\text{ gram}$$",
        },
        {
          correct: false,
          label: "$$1{.}216\\pi\\text{ gram}$$",
        },
        {
          correct: false,
          label: "$$1{.}728\\pi\\text{ gram}$$",
        },
      ],
    },
  },
};

export default item;

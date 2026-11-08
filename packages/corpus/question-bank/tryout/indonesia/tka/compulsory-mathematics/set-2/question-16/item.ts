import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "ring-mold",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$2{.}156\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$2{.}425{,}5\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$2{.}695\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$4{.}312\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$8{.}624\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;

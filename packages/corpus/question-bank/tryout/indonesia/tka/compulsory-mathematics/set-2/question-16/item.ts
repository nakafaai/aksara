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
          label: "$$2{.}310\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$3{.}080\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$3{.}850\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$4{.}620\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$9{.}240\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;

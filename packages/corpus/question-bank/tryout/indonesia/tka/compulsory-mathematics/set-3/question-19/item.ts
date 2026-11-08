import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$480\\text{ mL}$$",
        },
        {
          correct: false,
          label: "$$720\\text{ mL}$$",
        },
        {
          correct: true,
          label: "$$1{.}080\\text{ mL}$$",
        },
        {
          correct: false,
          label: "$$1{.}400\\text{ mL}$$",
        },
        {
          correct: false,
          label: "$$2{.}560\\text{ mL}$$",
        },
      ],
    },
  },
};

export default item;

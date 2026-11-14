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
          label: "$$\\text{Rp}256\\text{ juta}$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}320\\text{ juta}$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}400\\text{ juta}$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}500\\text{ juta}$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}625\\text{ juta}$$",
        },
      ],
    },
  },
};

export default item;

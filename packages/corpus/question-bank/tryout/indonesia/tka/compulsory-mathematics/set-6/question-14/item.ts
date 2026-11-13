import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2{,}5$$",
        },
        {
          correct: false,
          label: "$$4$$",
        },
        {
          correct: true,
          label: "$$5{,}5$$",
        },
        {
          correct: false,
          label: "$$10{,}5$$",
        },
        {
          correct: false,
          label: "$$16$$",
        },
      ],
    },
  },
};

export default item;

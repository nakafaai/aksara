import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "circles",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Desa $$A(30,40)$$",
        },
        {
          correct: false,
          label: "Desa $$B(-10,0)$$",
        },
        {
          correct: false,
          label: "Desa $$C(0,45)$$",
        },
        {
          correct: true,
          label: "Desa $$D(25,38)$$",
        },
        {
          correct: false,
          label: "Desa $$E(32,5)$$",
        },
      ],
    },
  },
};

export default item;

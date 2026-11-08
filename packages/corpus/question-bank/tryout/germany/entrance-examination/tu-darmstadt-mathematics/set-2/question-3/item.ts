import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$-2\\le x\\le3$$",
        },
        {
          correct: false,
          label: "$$-3\\le x\\le2$$",
        },
        {
          correct: false,
          label: "$$x\\le-2$$ oder $$x\\ge3$$",
        },
        {
          correct: false,
          label: "$$-2<x<3$$",
        },
        {
          correct: false,
          label: "$$x\\le3$$",
        },
        {
          correct: false,
          label: "$$x\\ge-2$$",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\dfrac13<x\\le3$$" },
        { correct: false, label: "$$\\dfrac13\\le x\\le3$$" },
        { correct: false, label: "$$0<x\\le3$$" },
        { correct: false, label: "$$0<x\\le7$$" },
        { correct: false, label: "$$1<x\\le81$$" },
      ],
    },
  },
};

export default item;

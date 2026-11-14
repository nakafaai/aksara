import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$x<0$$" },
        { correct: false, label: "$$0<x<4$$" },
        { correct: true, label: "$$4<x<4{,}5$$" },
        { correct: false, label: "$$4{,}5<x<5$$" },
        { correct: false, label: "$$x\\ge5$$" },
      ],
    },
  },
};

export default item;

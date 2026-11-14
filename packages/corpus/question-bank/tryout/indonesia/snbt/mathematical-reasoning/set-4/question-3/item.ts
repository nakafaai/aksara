import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "car-rental",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$150\\text{ km}$$" },
        { correct: false, label: "$$700\\text{ km}$$" },
        { correct: false, label: "$$875\\text{ km}$$" },
        { correct: true, label: "$$900\\text{ km}$$" },
        { correct: false, label: "$$1{.}050\\text{ km}$$" },
      ],
    },
  },
};

export default item;

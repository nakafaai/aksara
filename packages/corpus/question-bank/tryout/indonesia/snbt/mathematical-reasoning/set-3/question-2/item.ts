import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "bicycle-gears",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1{,}1\\text{ m}$$" },
        { correct: false, label: "$$2{,}2\\text{ m}$$" },
        { correct: false, label: "$$3{,}3\\text{ m}$$" },
        { correct: true, label: "$$4{,}4\\text{ m}$$" },
        { correct: false, label: "$$6{,}6\\text{ m}$$" },
      ],
    },
  },
};

export default item;

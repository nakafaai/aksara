import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "rain-tank",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0{,}5\\text{ m}$$" },
        { correct: false, label: "$$0{,}8\\text{ m}$$" },
        { correct: true, label: "$$1\\text{ m}$$" },
        { correct: false, label: "$$1{,}25\\text{ m}$$" },
        { correct: false, label: "$$2\\text{ m}$$" },
      ],
    },
  },
};

export default item;

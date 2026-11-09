import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "street-lamp",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0{,}6\\text{ m/detik}$$" },
        { correct: false, label: "$$1{,}2\\text{ m/detik}$$" },
        { correct: true, label: "$$1{,}8\\text{ m/detik}$$" },
        { correct: false, label: "$$2{,}4\\text{ m/detik}$$" },
        { correct: false, label: "$$3{,}6\\text{ m/detik}$$" },
      ],
    },
  },
};

export default item;

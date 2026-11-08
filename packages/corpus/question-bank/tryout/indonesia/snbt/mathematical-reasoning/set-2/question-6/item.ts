import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "street-lamp",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac13\\text{ m/detik}$$" },
        { correct: false, label: "$$1\\text{ m/detik}$$" },
        { correct: true, label: "$$\\dfrac43\\text{ m/detik}$$" },
        { correct: false, label: "$$\\dfrac32\\text{ m/detik}$$" },
        { correct: false, label: "$$4\\text{ m/detik}$$" },
      ],
    },
  },
};

export default item;

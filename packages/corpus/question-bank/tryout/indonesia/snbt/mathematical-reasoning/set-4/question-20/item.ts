import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "wallpaper-rolls",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$416\\text{ cm}$$" },
        { correct: false, label: "$$400\\text{ cm}$$" },
        { correct: false, label: "$$375\\text{ cm}$$" },
        { correct: false, label: "$$350\\text{ cm}$$" },
        { correct: true, label: "$$300\\text{ cm}$$" },
      ],
    },
  },
};

export default item;

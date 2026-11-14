import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "wallpaper-rolls",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$251\\le h\\le 333$$" },
        { correct: false, label: "$$247\\le h\\le 310$$" },
        { correct: false, label: "$$241\\le h\\le 323$$" },
        { correct: false, label: "$$193\\le h\\le 320$$" },
        { correct: true, label: "$$183\\le h\\le 310$$" },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "photo-frame",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$189\\text{ cm}^2$$" },
        { correct: false, label: "$$324\\text{ cm}^2$$" },
        { correct: false, label: "$$360\\text{ cm}^2$$" },
        { correct: false, label: "$$369\\text{ cm}^2$$" },
        { correct: true, label: "$$396\\text{ cm}^2$$" },
      ],
    },
  },
};

export default item;

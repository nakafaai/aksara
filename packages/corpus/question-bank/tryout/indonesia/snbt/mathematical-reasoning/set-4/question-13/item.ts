import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "can-design",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$80\\pi\\text{ cm}^2$$" },
        { correct: true, label: "$$112\\pi\\text{ cm}^2$$" },
        { correct: false, label: "$$114\\pi\\text{ cm}^2$$" },
        { correct: false, label: "$$128\\pi\\text{ cm}^2$$" },
        { correct: false, label: "$$160\\pi\\text{ cm}^2$$" },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$33$$" },
        { correct: false, label: "$$50$$" },
        { correct: true, label: "$$66$$" },
        { correct: false, label: "$$67$$" },
        { correct: false, label: "$$100$$" },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$90$$" },
        { correct: false, label: "$$85$$" },
        { correct: false, label: "$$82{,}5$$" },
        { correct: true, label: "$$80$$" },
        { correct: false, label: "$$77$$" },
      ],
    },
  },
};

export default item;

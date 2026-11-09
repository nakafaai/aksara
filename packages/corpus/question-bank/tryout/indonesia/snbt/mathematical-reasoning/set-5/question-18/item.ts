import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "bank-pin",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0{,}0504$$" },
        { correct: false, label: "$$0{,}3024$$" },
        { correct: false, label: "$$0{,}4536$$" },
        { correct: false, label: "$$0{,}496$$" },
        { correct: true, label: "$$0{,}504$$" },
      ],
    },
  },
};

export default item;

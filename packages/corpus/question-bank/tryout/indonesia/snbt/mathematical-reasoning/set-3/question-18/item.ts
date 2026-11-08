import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "print-prices",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$300$$" },
        { correct: false, label: "$$350$$" },
        { correct: false, label: "$$360$$" },
        { correct: true, label: "$$375$$" },
        { correct: false, label: "$$501$$" },
      ],
    },
  },
};

export default item;

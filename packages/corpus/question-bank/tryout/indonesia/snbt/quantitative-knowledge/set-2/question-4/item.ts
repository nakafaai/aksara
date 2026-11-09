import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$13$$" },
        { correct: false, label: "$$25$$" },
        { correct: true, label: "$$26$$" },
        { correct: false, label: "$$31$$" },
        { correct: false, label: "$$36$$" },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$25$$" },
        { correct: false, label: "$$27$$" },
        { correct: true, label: "$$29$$" },
        { correct: false, label: "$$31$$" },
        { correct: false, label: "$$54$$" },
      ],
    },
  },
};

export default item;

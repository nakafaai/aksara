import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$15$$" },
        { correct: true, label: "$$90$$" },
        { correct: false, label: "$$360$$" },
        { correct: false, label: "$$540$$" },
        { correct: false, label: "$$729$$" },
      ],
    },
  },
};

export default item;

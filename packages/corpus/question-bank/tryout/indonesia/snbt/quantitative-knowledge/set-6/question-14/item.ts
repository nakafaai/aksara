import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$9$$" },
        { correct: false, label: "$$12$$" },
        { correct: false, label: "$$14$$" },
        { correct: true, label: "$$16$$" },
        { correct: false, label: "$$17$$" },
      ],
    },
  },
};

export default item;

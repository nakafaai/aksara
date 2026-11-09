import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$9$$" },
        { correct: false, label: "$$30$$" },
        { correct: false, label: "$$35$$" },
        { correct: true, label: "$$39$$" },
        { correct: false, label: "$$48$$" },
      ],
    },
  },
};

export default item;

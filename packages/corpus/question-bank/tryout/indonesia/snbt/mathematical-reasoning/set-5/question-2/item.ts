import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "fuel-trip",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$12{,}5\\text{ km}$$" },
        { correct: false, label: "$$13\\text{ km}$$" },
        { correct: true, label: "$$13{,}125\\text{ km}$$" },
        { correct: false, label: "$$13{,}5\\text{ km}$$" },
        { correct: false, label: "$$14\\text{ km}$$" },
      ],
    },
  },
};

export default item;

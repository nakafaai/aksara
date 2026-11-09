import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "bicycle-gears",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2{,}2\\text{ km/jam}$$" },
        { correct: false, label: "$$4{,}4\\text{ km/jam}$$" },
        { correct: true, label: "$$6{,}6\\text{ km/jam}$$" },
        { correct: false, label: "$$13{,}2\\text{ km/jam}$$" },
        { correct: false, label: "$$19{,}8\\text{ km/jam}$$" },
      ],
    },
  },
};

export default item;

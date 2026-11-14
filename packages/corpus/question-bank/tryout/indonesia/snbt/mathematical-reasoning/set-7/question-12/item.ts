import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "aquarium-salinity",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$8\\text{ liter}$$" },
        { correct: false, label: "$$10\\text{ liter}$$" },
        { correct: false, label: "$$25{,}6\\text{ liter}$$" },
        { correct: false, label: "$$32\\text{ liter}$$" },
        { correct: false, label: "$$88\\text{ liter}$$" },
      ],
    },
  },
};

export default item;

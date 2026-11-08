import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "lawn-sprinklers",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$28{,}26\\text{ m}^2$$" },
        { correct: false, label: "$$39{,}48\\text{ m}^2$$" },
        { correct: true, label: "$$56{,}52\\text{ m}^2$$" },
        { correct: false, label: "$$113{,}04\\text{ m}^2$$" },
        { correct: false, label: "$$226{,}08\\text{ m}^2$$" },
      ],
    },
  },
};

export default item;

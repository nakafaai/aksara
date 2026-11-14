import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "football-league",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$2{,}4$$" },
        { correct: false, label: "$$3$$" },
        { correct: false, label: "$$4$$" },
        { correct: false, label: "$$4{,}8$$" },
        { correct: false, label: "$$6$$" },
      ],
    },
  },
};

export default item;
